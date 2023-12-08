const asyncHandler = require("express-async-handler");
const blogs = require('../model/blogmodel');
const moment = require('moment');

showblogs = asyncHandler(async (req, res, next) => {
       blogs.find()
          .then(allBlogs => {
            res.render('blog', { allBlogs: allBlogs })
          })   
      });

home = asyncHandler(async (req, res, next) => {

  res.redirect('/blogs');
})
showformpage = asyncHandler(async (req, res, next) => {
  let user = req.user;
  res.render('addblogs', {user: user});
})

//post methods
addblog = asyncHandler( async (req, res, next) => {
  let newComing = req.body;
  newComing.date = moment(new Date()).format("MMMM, D YYYY");

  let newBlog = new blogs(newComing);
  newBlog.save()
    .then(() => console.log('new blog saved'))
    .catch((err) => console.log(err));

  res.redirect('/blogs');
})



module.exports = {showblogs, home, showformpage, addblog};