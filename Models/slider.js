'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SliderSchema = Schema({
    posicion: {type: Number, required: true},
    imagen: {type: String,require: true},
    dateAdded: { type: Date, default: Date.now()},
    dateUpdate: { type: Date}
    
})

module.exports = mongoose.model('Slider', SliderSchema)
