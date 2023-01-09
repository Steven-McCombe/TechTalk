const router = require('express').Router();
const { Blog, User, Comments} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');

//Get all comments 
router.get('/', async (req, res) => {
  try {
    const commentData = await Comments.findAll({
      attributes: ['id','comment_body', 'created_at','blog_id'],
      include: [
        {
          model: User,
          attributes: ['name'],
          exclude: ['password']
        },
      ],
      order: [['created_at', 'DESC']],

    });
    res.json(commentData)
  } catch (err) {
    res.status(500).json(err)
  }
});

//Get comments by ID
router.get('/:id', async (req, res) => {
  try {
// get the id from the request parameters
    const id = req.params.id;
// use the id to retrieve the specific comment from the database
    const commentData = await Comments.findByPk(id, {
      attributes: ['id','comment_body', 'created_at','blog_id'],
      include: [
      //returns data from user model to show who created it
        {
          model: User,
          attributes: ['name'],
          exclude: ['password']
        },
      ],
      order: [['created_at', 'DESC']],

    });
    res.json(commentData)
  } catch (err) {
    res.status(500).json(err)
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
//Edit comment request
router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comments.update(
      {
        comment_body: req.body.comment_body,
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//!Delete comment request
router.delete('/:id', withAuth, async (req, res) => {
    try {
     const commentData = await Comments.destroy({
        where: {
         id: req.params.id,
        user_id: req.session.user_id
        },
      });
      res.json(commentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;