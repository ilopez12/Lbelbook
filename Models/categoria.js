'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategoriaSchema = Schema({
    
    nombre: { type: String, unique: true},
    imagen: { type: String , required: true},
    dateAdded: { type: Date, default: Date.now() },
    dateUpdate: { type: Date, default: Date.now() },
        
})

module.exports = mongoose.model('Categoria', CategoriaSchema)
