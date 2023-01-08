const router = require('express').Router();
const { Blog, User, Comments} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


// Create a blog post
router.post('/', withAuth, async (req, res) => {
    // If user is logged in, this will create a new blog post
    try {
      const commentData = await Blog.create({
        title: req.body.title,
        contents: req.body.content,
        user_id: req.session.user_id,
      });
      res.json(blogData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//Delete blog request
router.delete('/:id', withAuth, async (req, res) => {
    try {
      await Comments.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;