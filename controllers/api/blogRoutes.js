const router = require('express').Router();
const { Blog, User, Comments} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


// Create a blog post
router.post('/', withAuth, (req, res) => {
    //If user is logged in this will create a new blog post
    Blog.create({ 
        title: req.body.title,
        contents: req.body.content,
        user_id: req.session.user_id
    })
        .then(blogData => res.json(blogData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err); 
        });
});

//Delete blog request
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id 
        }
    }).then(blogData => {
        if (!blogData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;