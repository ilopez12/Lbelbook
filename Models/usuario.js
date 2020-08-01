const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;
  //


let rolesvalidos ={
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE}'
}

//DATOS DE LOS LIBROS
const UsuarioSchema = new Schema({
    nombre_usr: {
        type: String,
        require: [true, 'El nombre es Necesario'],
    },
    apel_usr: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        require: [true, 'El Precio es Necesario'],
        unique: true
    },
    pass: {
        type: String,
        require: [true, 'la cantidad es Necesaria']
    },
    rol: {
        type: String,
        require: [true, 'la cantidad es Necesaria'],
        default: 'USER_ROLE',
        enum: rolesvalidos
    },
    fecha: {
        type: String,
        require: false
    },
    estado: {
        type: Boolean,
        require: true,
        default: true
    },
});


UsuarioSchema.plugin(uniqueValidator, { message: '{PATH} Correo debe ser unico' });
module.exports = mongoose.model('usuario', UsuarioSchema);