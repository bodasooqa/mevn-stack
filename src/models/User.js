const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    username: String,
    email: String,
    password: String
});

User.methods.validPassword = function(pwd) {
    return ( this.password === pwd );
};

module.exports = mongoose.model('User', User);