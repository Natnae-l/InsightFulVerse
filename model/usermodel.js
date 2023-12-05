const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true, minLength:2},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;