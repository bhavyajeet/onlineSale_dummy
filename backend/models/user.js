const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    rating: [{
        type: Number
    }],
    reviews: {
        type: Array
    }
});

module.exports = mongoose.model('User', User);