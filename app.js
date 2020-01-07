var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var AluminiUser = require('./models/user');


var userRoute = require('./routes/user');
var postRoute = require('./routes/post');

var PORT = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));



app.use(require('express-session')({
    secret: 'Secretsss',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(AluminiUser.authenticate()));

passport.serializeUser(AluminiUser.serializeUser());
passport.deserializeUser(AluminiUser.deserializeUser());

app.use(userRoute);
app.use(postRoute);



mongoose.connect('mongodb://localhost/Alumini', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server listening at ${PORT}`);
});