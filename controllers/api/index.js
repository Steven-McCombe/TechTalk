const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const blogRoutes = require('./blogRoutes');

router.use('/users', userRoutes);

module.exports = router;
