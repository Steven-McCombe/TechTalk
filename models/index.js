const Blog = require('./Blog')
const User = require('./User')
const Comments = require('./Comments')

//Many to one Relationship - User has Many Blogs but a blog can only have one user.
//If the user is deleted CASCADE will delete all their blog entries.
User.hasMany(Blog, {
    foreignKey: 'user_id:',
    onDelete: 'CASCADE'
})

//Many to one Relationship - User has Many comments but a comment can only have one user.
//If the user is deleted CASCADE will delete all their comment entries.
User.hasMany(Comments, {
    foreignKey: 'user_id:',
    onDelete: 'CASCADE'
})

// One to Many Relationship - Specifies that a Blog belongs to a user. 
Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.hasMany(Comments, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
})

Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Comments.belongsTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
})

module.exports = { Blog, User, Comments };