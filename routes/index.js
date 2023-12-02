const express = require('express');
const router = express.Router();
const blogcontroller = require('../controllers/blogcontroller');


/* GET home page. */
router.get('/', blogcontroller.home);
router.get('/blogs', blogcontroller.showblogs);
router.get('/addblogs', blogcontroller.showformpage);

// post requests
router.post('/addblog', blogcontroller.addblog)

module.exports = router;
