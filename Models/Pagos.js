const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const PagoSchema = new Schema({
    
    monto: { type: Number ,require: true},
    dateAdded: { type: Date, default: Date.now() },
    dateUpdate: { type: Date, default: Date.now() },
        
})

module.exports = mongoose.model('Pago', PagoSchema)
