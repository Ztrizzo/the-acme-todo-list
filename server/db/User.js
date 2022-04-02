const Sequelize = require('sequelize');
const conn = require('./conn');

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
