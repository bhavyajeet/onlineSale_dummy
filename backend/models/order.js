const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    username: {
        type: String
    },
    productname: {
        type: String
    },
    Price: {
        type: Number
    },
    Quantity: {
        type: Number,
        required: true
    },
    vendorname: {
        type: String
    },
    status: {
        type: String
    },
    productid: {
        type: String
    },
    hasratedv: {
        type: Boolean
    },
    israted: {
        type: Boolean
    }

});

module.exports = mongoose.model('Order', Order);