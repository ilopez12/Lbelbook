var express = require('express');
var app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var usuarios = require('../Models/usuario');
var dat= new Date();
var dat2 = Date.parse(dat);

app.post('/logins', (req, res) => {
    var data = req.body;

    if (data.pass_l == null || data.user_log == null) {

        res.json({
            exito: false,
            err: {
                message: 'Faltan Parametros en el Post'
            }

        }); 
    } else { 

        usuarios.findOne({ email: data.user_log }, (err, usuarioDB) => {
            if (err) {
                res.json({
                    exito: false,
                    err
                });
            } else {
                if (!usuarioDB) {
                    res.json({
                        exito: false,
                        err: {
                            message: '(Usuario) O Contraseña Incorrectoe'
                        }
                    });
                } else {
                    if (usuarioDB) {
                        if (!bcrypt.compareSync(data.pass_l, usuarioDB.pass)) {
                            return res.status(400).json({
                                exito:false,
                                err:{
                                  
                                    message: 'Usuario O (Contraseña) Incorrecto3'
                                }
                            })
                        } else {
                            //generar el jwt
                           let token = jwt.sign({
                               usuario: usuarioDB
                           }, 'secret', {expiresIn: process.env.CADUCIDAD_TOKEN} );
                           res.cookie("auth",token)
                           res.render('../public/views/', { title: 'LEBLBOOK ', estatus: token});

                        }
                    }  
                }
            }
        });
    }
});

module.exports = app;   