const express = require('express');
const router = express.Router();
const blogcontroller = require('../controllers/blogcontroller');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


/* GET home page. */
router.get('/check', (req, res) => {
    res.render('login1')
})
router.get('/forget', blogcontroller.forget)
router.get('/',forwardAuthenticated, blogcontroller.home);
router.get('/blogs', ensureAuthenticated, blogcontroller.showblogs);
router.get('/addblogs', ensureAuthenticated, blogcontroller.showformpage);

router.get('/dashboard', ensureAuthenticated, userBlogs)

/* GET users listing. */


// post requests
router.post('/addblog', ensureAuthenticated, blogcontroller.addblog)

// delete a particular blog
router.delete('/blogs/:id',ensureAuthenticated, deleteBlog)

module.exports = router;
