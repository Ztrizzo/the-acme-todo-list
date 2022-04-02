const router = require('express').Router();
const { User } = require('../db').models;

// GET /api/todos
router.get('/', async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (error) {
    next(error);
  }
});


module.exports = router;
