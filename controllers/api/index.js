const router = require('express').Router();

// requiring in the routes 
const userRoutes = require('./userRoutes.js');
const commentRoutes = require('./commentRoutes.js');
const blogRoutes = require('./blogRoutes.js');

//pathing for the router
router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
