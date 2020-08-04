const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;
  //
//DATOS DE LOS LIBROS
const CarritoSchema = new Schema({
    nombre_libro: {
        type: String,
        require: [true, 'El nombre es Necesario'],
    },
    autor_libro: {
        type: String,
       // required: true,
    },
    codigo_libro: { 
        type: Number,
     //   required: true,

    },
    precio_libro: {
        type: Number,
     //   require: [true, 'El Precio es Necesario']
    },
    cantidad_libro: {
        type: Number,
    //    require: [true, 'la cantidad es Necesaria']
    },
    total: {
        type: Number,
        //required: [true, 'La descripcion es Necesaria']

    },
   img_libro:  {
        type: String, 
    //    require: false
 
    } ,

    
});


//ProductoSchema.plugin(uniqueValidator, { message: '{PATH} Debe de ser Unico' });
module.exports = mongoose.model('carrito', CarritoSchema);