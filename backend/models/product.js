const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Price: {
        type: Number
    },
    Quantity: {
        type: Number
    },
    Owner: {
        type: String
    },
    Orders: {
        type: Number
    },
    Status: {
        type: String
    },
    Rating: [{
        type: String
    }]

});
Product.plugin(uniqueValidator);
module.exports = mongoose.model('Product', Product);