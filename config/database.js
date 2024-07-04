const Sequelize = require('sequelize');
const env = require('dotenv');
const { database, dbusername, dbpassword, dbhost } = require('./config');
env.config();

const sequelize = new Sequelize(database, dbusername, dbpassword, {
  dialect: 'mysql',
  host: dbhost
});

module.exports = sequelize;
 