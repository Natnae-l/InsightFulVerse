const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let blogSchema = new Schema({
    content: {type: String, required: true},
    description: {type: String, required: true, minlength: 2},
    date: {type: String, required: true},
    userId: {type: String, required: true}
});

let blogModel = mongoose.model('blog', blogSchema);

module.exports = blogModel;