const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog, Comments } = require('../models');
const withAuth = require('../utils/auth');

//RENDER HOMEPAGE
router.get('/', async (req, res) => {
    try {
        // Get all Blogs and JOIN with user data
        const blogData = await Blog.findAll({
            attributes: ['id', 'title', 'contents', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
            order: [['created_at', 'DESC']],
            limit: 10,
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        console.log(blogs)
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//RENDER LOGIN PAGE ROUTE
router.get('/login', (req, res) => {

    //if user is signed in redirect to homepage
    if(req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('login');
});

// RENDER DASHBOARD ROUTE 
router.get('/dashboard', async (req, res) => {
    
    try {
        // Get all Blogs and JOIN with user data
        const userBlogData = await Blog.findAll({
           
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'contents', 'created_at', 'user_id'],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
            order: [['created_at', 'DESC']],
        });

        const userBlogs = userBlogData.map((userBlog) => userBlog.get({ plain: true }));
        
        console.log(userBlogs)
        res.render('dashboard', {
            userBlogs,
            logged_in: req.session.logged_in,
            session_user_id: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

// RENDER BLOG BY ID 
// redirecting users to see all their blogs with comments
router.get('/blog/:id', async (req, res) => {
    try {
        
    const viewBlogData = await Blog.findAll({
        where: {
          id: req.params.id
        },
        attributes: ['id','contents','title','created_at','user_id'],
        include: [
          {
            model: Comments,
            attributes: ['id', 'comment_body', 'blog_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['name']
            }
          },
          {
            model: User,
            attributes: ['name']
          }
        ]
      })
      const viewBlogs = viewBlogData.map((viewBlog) => viewBlog.get({ plain: true }));
        
      console.log(viewBlogs)
      res.render('blog', {
           viewBlogs,
          logged_in: req.session.logged_in
      });
  } catch (err) {
      res.status(500).json(err);
  }

});

//EDIT BLOG POST ROUTE
router.get('/edit/:id', async (req, res) => {
    try {
        
    const editBlogData = await Blog.findAll({
        where: {
          id: req.params.id
        },
        attributes: ['id','contents','title','created_at','user_id'],
        include: [
          {
            model: User,
            attributes: ['name']
          }
        ]
      })
      const editBlogs = editBlogData.map((editBlog) => editBlog.get({ plain: true }));
        
      console.log(editBlogs)
      res.render('edit', {
          editBlogs,
          logged_in: req.session.logged_in
      });
  } catch (err) {
      res.status(500).json(err);
  }

});
//Find comments by user ID
router.get('/comment/:id', async (req, res) => {
    try {

  // use the id to retrieve the specific comment from the database
      const commentData = await Comments.findAll({
        where: {
          user_id: req.session.user_id
      },
        attributes: ['id','comment_body', 'created_at','blog_id'],
        include: [
        //returns data from user model to show who created it
          {
            model: User,
            attributes: ['name'],
            exclude: ['password']
          },
          {
            model: Blog,
            attributes: ['title']
          }
        ],
        order: [['created_at', 'DESC']],
  
      });
      const comments = commentData.map((comment) => comment.get({ plain: true }));
      console.log(comments)
      res.render('comments', {
        comments,
        logged_in: req.session.logged_in
    });
    } catch (err) {
      res.status(500).json(err)
    }
});
  
//EDIT COMMENT BY ID Route
router.get('/comment/edit/:id', async (req, res) => {
  try {
      
  const editCommentData = await Comments.findAll({
      where: {
        id: req.params.id
      },
      attributes: ['id','comment_body','created_at','blog_id'],
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    })
    const editComments = editCommentData.map((editComment) => editComment.get({ plain: true }));
      
    console.log(editComments)
    res.render('editcomments', {
        editComments,
        logged_in: req.session.logged_in
    });
} catch (err) {
    res.status(500).json(err);
}

});

module.exports = router; 