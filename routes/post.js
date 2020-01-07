var express = require('express');
var Post = require('../models/posts');


var router = express.Router();

router.get('/posts', (req, res) => {
    if (req.query.search && req.query.sortBy === 'posts') {
        var regex = new RegExp(escapeCharacters(req.query.search), 'gi');
        Post.find({ title: regex }, (err, posts) => {
            if (err) console.log(err);
            else {
                res.render('posts', { posts: posts });
            }
        })
    } else if (req.query.search && req.query.sortBy === 'students') {
        res.send('Students database not found');
    } else if (req.query.search && req.query.sortBy === 'domain') {
        res.send('Domain database not found');
    } else {
        Post.find({}, (err, posts) => {
            if (err) {
                console.log(err);
            } else {
                res.render('posts', { posts: posts });
            }
        })
    }
});


function escapeCharacters(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = router;