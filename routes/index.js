const express = require('express');
const router = express.Router();
const blogcontroller = require('../controllers/blogcontroller');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


/* GET home page. */
router.get('/',forwardAuthenticated, blogcontroller.home);
router.get('/blogs', ensureAuthenticated, blogcontroller.showblogs);
router.get('/addblogs', ensureAuthenticated, blogcontroller.showformpage);

router.get('/dashboard', ensureAuthenticated, userBlogs)

/* GET users listing. */


// post requests
router.post('/addblog', ensureAuthenticated, blogcontroller.addblog)

module.exports = router;
