const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
// const commentRoutes = require('./commentRoutes.js');
const blogRoutes = require('./blogRoutes.js');

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
// router.use('/comment', commentRoutes);

module.exports = router;
