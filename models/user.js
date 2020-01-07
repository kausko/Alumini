var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var aluminiSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    collegeid: String,
    profile: String
});

aluminiSchema.plugin(passportLocalMongoose);

var AluminiUser = mongoose.model('aluminiUser', aluminiSchema);

module.exports = AluminiUser;