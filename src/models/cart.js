const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    glasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Glasses'
    }],
    quantity_item: [{
        glasses_id: String,
        quantity: String
    }],
    phone: String,
    address: String,
    courier: String,
});

module.exports = mongoose.model('Order', Order);