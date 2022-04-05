const Sequelize = require('sequelize');
const conn = require('./conn');

const Todo = conn.define('todo', {
  taskName: {
    type: Sequelize.STRING(20),

    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Task name cannot be empty'
      }
    }
  }
});

module.exports = Todo;
