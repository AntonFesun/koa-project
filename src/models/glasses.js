const mongoose = require('mongoose');

const glassesSchema = new mongoose.Schema({
    name: String,
    id: String,
    type: String,
    sex: String,
    shape: String,
    colorOfGlass: String,
    gradient: String,
    lenstype: String,
    colorOfFrame: String,
    material: String,
    price: String,
    description: String,
    foto_1 : String,
    foto_2 : String,
    foto_3 : String,
    quantity: String
});

module.exports = mongoose.model('Glasses', glassesSchema);