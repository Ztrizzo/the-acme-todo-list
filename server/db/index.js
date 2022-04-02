const conn = require('./conn');
const Todo = require('./Todo');
const User = require('./User');

Todo.belongsTo(User);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const [lucy, moe] = await Promise.all([
    User.create({ name: 'lucy' }),
    User.create({ name: 'moe' }),
    User.create({ name: 'ethyl' }),
    User.create({ name: 'larry' }),
  ]);
  await Todo.create({
    taskName: 'Buy dog food',
    userId: moe.id
  });

  await Todo.create({
    taskName: 'Take over world',
    userId: lucy.id
  });

  await Todo.create({
    taskName: 'Pay electric bill',
  });

  console.log(`
    Seeding successful!
  `);
};


module.exports = {
  conn,
  syncAndSeed,
  models: {
    Todo,
    User
  }
};
