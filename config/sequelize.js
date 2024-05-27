const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_course4', 'root', '123456789', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
