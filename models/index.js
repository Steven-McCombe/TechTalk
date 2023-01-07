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
User.hasMany(Comment, {
    foreignKey: 'user_id:',
    onDelete: 'CASCADE'
})

// One to Many Relationship - Specifies that a Blog belongs to a user. 
Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    Through: {
        model: Blog,
        foreignKey: 'id'
    }
})


module.exports = { Blog, User, Comments };