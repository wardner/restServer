const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let productSchema = new Schema({
    barcode: {
        type: String,
        required: [true, 'El codigo de barras es necesario'],
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

productSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

module.exports = mongoose.model('product', productSchema);