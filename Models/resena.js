'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResenaSchema = Schema({
    
    id_libro: { type: Schema.Types.ObjectId, ref: 'Libro'},
    autor: {type: String, default: true},
    resena: {type: String,require: true},
    imagen: {type: String,require: true },
    dateAdded: { type: Date, default: Date.now()},
    dateUpdate: { type: Date}
    
})

module.exports = mongoose.model('Resena', ResenaSchema) 