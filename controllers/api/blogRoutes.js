const router = require('express').Router();
const { Blog, User, Comments} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


/// GET REQUESTS DO NOT REQUIRE AUTH
//Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      attributes: ['id', 'title', 'contents', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['name'],
          exclude: ['password']
        },
      ],
      order: [['created_at', 'DESC']],

    });
    res.json(blogData)
  } catch (err) {
    res.status(500).json(err)
  }
});

//Find blogs by id. Returns data from the user model to show creator
router.get('/:id', async (req, res) => {
  try {
    // get the id from the request parameters
    const id = req.params.id;

    // use the id to retrieve the specific blog from the database
    const blogData = await Blog.findByPk(id, {
      attributes: ['id', 'title', 'contents', 'created_at'],
      //returns data from user model to show who created it
      include: [
        {
          model: User,
          attributes: ['name'],
          exclude: ['password']
        },
        //returns data from the comment model to show related comments. 
        {
          model: Comments,
          attributes: ['id', 'comment_body', 'blog_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['name']
          },
        }
      ],
    });

    // if a blog with the specified id was not found, return a 404 response
    if (!blogData) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // return the blog data in the response
    res.json(blogData);
  } catch (err) {
    // if there was an error, return a 500 response
    res.status(500).json(err);
  }
});


 
// Create a blog post
router.post('/', withAuth, async (req, res) => {
    // If user is logged in, this will create a new blog post
    try {
      const blogData = await Blog.create({
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
//Edit a blog post 
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(
      {
        title: req.body.title,
        contents: req.body.content,
        user_id: req.session.user_id,
      },
      {
        where: req.params.id,
      }
    );
    res.json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete blog request
router.delete('/:id', withAuth, async (req, res) => {
    try {
      await Blog.destroy({
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