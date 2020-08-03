'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LibroSchema = Schema({
    
    estado: {type: Boolean, default: true},
    nombre: {type: String,require: true},
    autor:{type: String,require: true},
    codigo: {type: Number,require: true },
    precio: {type: Number, require: true},
    cantidad: {type: Number, require: true},
    descripcion:{type: String,require: true},
    img:{type: String, require: false},
    categoria:{type: String, require: true},
    id_categoria: { type: Schema.Types.ObjectId, ref: 'Categoria'},
    dateAdded: { type: Date, default: Date.now()},
    dateUpdate: { type: Date}
    
})

module.exports = mongoose.model('Libro', LibroSchema)
