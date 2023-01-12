const router = require('express').Router();

//requiring in routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

//pathing for router
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//if path is wrong this will be the response
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;
