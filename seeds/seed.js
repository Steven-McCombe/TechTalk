const sequelize = require('../config/connection');
const { User, Blog, Comments } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const blog = await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });
  const comments = await Comments.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
//   for (const blog of blogData) {
//     await Blog.create({
//       ...blog,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

  process.exit(0);
};

seedDatabase();