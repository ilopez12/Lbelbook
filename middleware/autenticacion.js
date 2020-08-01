
const jwt = require('jsonwebtoken');

/*

Validar el Token

*/
let verificadorToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        console.log(token);
        next();

    });



};

/*=====================================
validar admin_rol
===================================== */

// SOLO EL ADMIN ROL
let validatorRol = (req, res, next) => {
    var usuario = req.usuario;
    console.log(usuario.role);
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.status(401).json({
            exito: false,
            err: {
                message: 'Usuario Sin derecho crear o Actualziar'
            }
        });
    }
}

module.exports = {
    verificadorToken,
    validatorRol
}