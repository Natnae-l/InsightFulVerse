const express = require('express');
const router = express.Router();
const blogcontroller = require('../controllers/blogcontroller');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


/* GET home page. */
router.get('/',forwardAuthenticated, blogcontroller.home);
router.get('/blogs', blogcontroller.showblogs);
router.get('/addblogs', blogcontroller.showformpage);

/* GET users listing. */


// post requests
router.post('/addblog', blogcontroller.addblog)

module.exports = router;
