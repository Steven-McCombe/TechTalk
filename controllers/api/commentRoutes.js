const router = require('express').Router();
const { Blog, User, Comments} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');

//Get all comments 
router.get('/', async (req, res) => {
  try {
      // 
      const commentData = await Comments.findAll({
          attributes: ['id', 'comment_body', 'created_at', 'blog_id', 'user_id'],
          include: [
              {
                  model: Blog,
                  attributes: ['id'],
              },
          ],
          order: [['created_at', 'DESC']],
          
      });

      const comments = commentData.map((blog) => blog.get({ plain: true }));
      console.log(comments)
      res.render('comment', {
          comments,
          logged_in: req.session.logged_in
      });
  } catch (err) {
      res.status(500).json(err);
  }
});
//Get comments by ID
router.get('/:id', async (req, res) => {
  try {
     
    const commentData = await Comments.findAll({
        where: req.params.user_id,
          attributes: ['id', 'comment_body', 'created_at', 'blog_id', 'user_id'],
          include: [
              {
                  model: blog,
                  attributes: ['id'],
              },
          ],
          order: [['created_at', 'DESC']],
          
      });

      const comments = commentData.map((blog) => blog.get({ plain: true }));
      console.log(comments)
      res.render('comment', {
          comments,
          logged_in: req.session.logged_in
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

// Create a comment
router.post('/', withAuth, async (req, res) => {
    // If user is logged in, this will create a new blog post
    try {
      const commentData = await Comments.create({
        comment_body: req.body.comment_body,
        blog_id:  req.body.blog_id,
        user_id: req.session.user_id,
      });
      res.json(commentData);
    } catch (err) {
      
    }
  });

//Delete comment request
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