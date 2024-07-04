require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
// const winston = require("./config/winston");
const sequelize = require("./config/database");
const config = require("./config/config.js");
const Home = require("./routes/home");
// const authRouter = require("./routes/authRouter")
// const projectRoutes = require("./routes/projectRouter");
// const projectTaskRouter = require("./routes/projectTaskRouter");
// const employeeRouter = require('./routes/employeeRouter')
const errorController = require("./apps/controller/ErrorController");
const errorHandler = require("./apps/middleware/ErrorHandler");

const app = express(); 

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200 
});
app.use(limiter);

// Request logging
app.use(morgan('combined'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Routes
app.use('/', Home);
app.use(errorController.pageNotFound);

app.use(errorHandler);
 
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });  
    app.listen(config.port, '0.0.0.0', () => {  
      console.log(`App listening on port ${config.port}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.log('Unable to start the server:', error);
  }
};

const shutdown = async () => { 
  console.log('Shutting down server...');
  await sequelize.close();
  process.exit(0);
};

startServer();

module.exports = app;
 