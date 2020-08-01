var express = require('express');
var app = express();
const bcrypt = require('bcrypt');

var usuarios = require('../Models/usuario');
var dat= new Date();
var dat2 = Date.parse(dat);
const {verificadorToken} = require('../middleware/autenticacion')


// CREANDO UN USUARIO
app.post('/usuario/create', (req, res) => { 
var datos= req.body;

    let Usuario = new usuarios({
        nombre_usr: datos.name,
        apel_usr: datos.apel,
        email: datos.email,
        pass: bcrypt.hashSync(datos.pass,10), 
        fecha: dat2,
    });

    Usuario.save((err, usuariodb) => {
        if (err) {
            res.json({
                exito: false,
                err
            });
        }else{

            usuariodb.pass = null;
            res.render('../public/views/index.hbs', { title: 'LEBLBOOK ' });
            console.log(Usuario);

        }

    });

});

//ACTUALIZAR USUARIO
app.put('/usuario/:id',verificadorToken, (req, res) => {

   let id = req.params.id;
   let body = req.body;

   usuarios.findByIdAndUpdate(id, body, {new: true}, (err, usuariodb )=> {
    if (err) {
        res.json({
            exito: false,
            err
        });
    }

        res.json({
            ok:true,
            usuario: usuariodb 
        })
        })
});


//TRAER USUARIOS POR ID
app.get('/usuario/:id', verificadorToken, (req, res) => {
    //id de la categoria
    var id_usuario = req.params.id;

    usuarios.findById({ _id: id_usuario }, (err, usuario) => {
        if (err) {
            res.status(400).json({
                exito: false,
                err: {
                    message: `No se encontro registro con el Id ${id_usuario}`
                }
            });
        }

        res.json({
            exito: true,
            usuario
        });
    });
});

//TRAER TODOS LOS USUARIOS
app.get('/usuario', verificadorToken, (req, res) => {
    //variable global
    console.log('ENTRO');
    let desde = req.query.desde || 00;

    desde = Number(desde);
    let limite = req.query.limite || 6;
   limite = Number(limite);
    // los parametros opcionaes se mandan ?name_parametro & => si hay otro
    usuarios.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarioDB) => {
            console.log('AQUI');
            if (err) {
                res.status(400).json({
                    exito: false,
                    err
                });
                console.log('YELLGO AL NO');
            }

            usuarios.countDocuments({ estado: true }, (err, conteo) => {
             //   console.log(token);
                res.json({
                    exito: true,
                    usuarioDB,
                    cantidad: conteo

                    
                })
                console.log('YELLGO AL NO'+conteo);
            });

        });

   
});



module.exports = app;