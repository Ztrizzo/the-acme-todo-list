const util = require('util');

const router = require('express').Router();
const { Todo } = require('../db').models;

// GET /api/todos
router.get('/', async (req, res, next) => {
  try {
    res.send(await Todo.findAll());
  } catch (error) {
    next(error);
  }
});

// POST /api/todos
router.post('/', async (req, res, next) => {
  try {
    if(req.body.userId === ''){
      req.body.userId = null;
    }
    res.status(201).send(await Todo.create(req.body));
  } catch (error) {
    if (error.name === 'SequelizeValidationError'){
      return res.status(400).send(error.message);
    }
    else if(error.name === 'SequelizeDatabaseError'){
      return res.status(400).send(error.message);
    }
    else
      next(error);
  }
});

// PUT /api/todos/:id
router.put('/:id', async (req, res, next) => {
  try {
    if(req.body.userId === ''){
      req.body.userId = null;
    }
    const todo = await Todo.findByPk(req.params.id);
    const updated = await todo.update(req.body);
    res.send(await Todo.findByPk(req.params.id));
  } catch (error) {
    if (error.name === 'SequelizeValidationError'){
      return res.status(400).send(error.message);
    }
    else if(error.name === 'SequelizeDatabaseError'){
      return res.status(400).send(error.message);
    }
    else
      next(error);
  }
});

// DELETE /api/todos/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    await todo.destroy();
    res.send(todo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
