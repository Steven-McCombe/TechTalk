const sequelize = require('../config/connection');
const { User, Blog, Comments } = require('../models');

//require in the seeds.
const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
// Seed USERS to database
console.log('\n ----- Adding Users -----\n')
const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});
    console.log('\n ----- Sample users added to the database -----\n')   
    
    //Seed Blogs to the database    
    console.log('\n ----- Adding Blogs -----\n')
    const blog = await Blog.bulkCreate(blogData);
    console.log('\n ----- Sample Blogs added to the database -----\n')   

    //Seed Comments to the database
    console.log('\n ----- Adding Comments -----\n') 
    const comments = await Comments.bulkCreate(commentData);
    console.log('\n ----- Sample Comments added to the database -----\n')   

  process.exit(0);
};

seedDatabase();