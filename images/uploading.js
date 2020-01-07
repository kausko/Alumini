var express = require('express');
var multer = require('multer');
var path = require('path');

var app = express();

var storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        if (file)
            cb(null, Date.now() + file.originalname + path.extname(file.originalname));
        else
            cb(null, 'Null');
    }
});

var upload = multer({ storage: storage });

module.exports = upload;