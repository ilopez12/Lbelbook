const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;
  //
//DATOS DE LOS LIBROS
const ResenaSchema = new Schema({
    libro: {
        type: String,
        require: [true, 'El nombre es Necesario'],
    },
    autor: {
        type: String,
        required: true,

    },
    resena: {
        type: String,
        require: [true, 'Reseña necesaria']
    },
   /* img: {
        type: String,
        require: [true, 'Imagen obligatoria']
    },*/
    
});


//ProductoSchema.plugin(uniqueValidator, { message: '{PATH} Debe de ser Unico' });
module.exports = mongoose.model('resena', ResenaSchema);