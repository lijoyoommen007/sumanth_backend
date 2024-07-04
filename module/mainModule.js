const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  county: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zip_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  age_group: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age_group_percentage: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  health_enrollment: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dental_enrollment: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  new_health_enrollment: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  new_dental_enrollment: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  enrollment_terminated_health: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  enrollment_terminated_dental: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_enrollment: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'enrollments'
});

module.exports = Enrollment;
