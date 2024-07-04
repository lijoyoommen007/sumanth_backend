require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  database: process.env.DB_DATABASE,
  dbhost :process.env.DB_HOST,
  dbusername:process.env.DB_USERNAME,
  dbpassword:process.env.DB_PASSWORD,
  jwtsecret:process.env.JWT_SECRET
};
