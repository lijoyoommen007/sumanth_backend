const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const Enrollment = require('../module/mainModule');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.send('Server is running...');
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    console.log(jsonData);

    const enrollments = jsonData.map(row => ({
      country: row.Country,
      state: row.state,
      county: row.county,
      zip_code: row.zip_code,
      year: row.year,
      age_group: row.age_group,
      age_group_percentage: row.age_group_percentage,
      health_enrollment: row.health_enrollment,
      dental_enrollment: row.dental_enrollment,
      new_health_enrollment: row.new_health_enrollment,
      new_dental_enrollment: row.new_dental_enrollment,
      enrollment_terminated_health: row.enrollment_terminated_health,
      enrollment_terminated_dental: row.enrollment_terminated_dental,
      total_enrollment: row.Total_Enrollment
    }));

    await Enrollment.bulkCreate(enrollments);

    res.status(201).send('Data successfully uploaded and inserted into the database.');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/enrollments', async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New route to fetch country details based on dynamic query parameters
router.get('/country-details', async (req, res) => {
  try {
    const query = {};

    // Loop through query parameters and build the query object
    for (const key in req.query) {
      if (req.query.hasOwnProperty(key)) {
        query[key] = req.query[key];
        
      }
    }

    const countries = await Enrollment.findAll({
      where: query,
      order: [['year', 'ASC']], // Sort by year in ascending order

    });

    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
