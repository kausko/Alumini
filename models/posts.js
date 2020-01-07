var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: String
});

var Post = mongoose.model('post', postSchema);

module.exports = Post;