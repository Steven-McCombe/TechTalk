const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog, Comments } = require('../models');
const withAuth = require('../utils/auth');


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
            order: [['created_at', 'DESC']]
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
// TODO: Need return data by username. through req.session
router.get('/dashboard', async (req, res) => {

    try {
        // Get all Blogs and JOIN with user data
        const userBlogData = await Blog.findAll({
            where: {
                user_id: 2
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
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});


module.exports = router; 