var express = require('express');
var app = express();
const bcrypt = require('bcrypt');

var Carritos = require('../Models/carrito');
var dat= new Date();
var dat2 = Date.parse(dat);
const {verificadorToken} = require('../middleware/autenticacion')

//AÑADIENDO A CARRITO
app.post('/carrito/add', (req, res) => { 
    var datos= req.body;
    
        let Carrito = new Carritos({
            nombre_libro: datos.nombre_libro,
            autor_libro: datos.autor_libro,
            codigo_libro: datos.codigo_libro,
            precio_libro: datos.precio_libro, 
            cantidad_libro: datos.cantidad_libro,
            img_libro : datos.img_libro

        });
    
        Carrito.save((err, carritodb) => {
            if (err) {
                res.json({
                    exito: false,
                    err
                });
            }else{
    
                carritodb.pass = null;
                res.json({
                    exito: true,
                    Carrito: carritodb
                   
                });
                //res.render('../public/views/index.hbs', { title: 'LEBLBOOK ' });
                console.log(Carrito);
    
            }
    
        });
    
    });

//DELETE ALL
app.delete('/carrito/delete/', (req, res) => {
        var id_productos = req.params.id
        Carritos.deleteMany((err, CarritoDB) => {
            if (err) {
                res.status(400).json({
                    exito: false,
                    err
    
                });
            }
            if (Carritos == null) {
                res.status(400).json({
                    exito: false,
                    err: {
                        message: `El producto con ID ${id_productos} no EXISTE`
                    }
                })
            }
    
            res.json({
                exito: true,
                producto: Carritos
            });
        });
    });  
    
app.get('/carrito/All', (req, res) => {

        console.log( 'ENTRO AQUI');
      Carritos.find({})
        .exec((err, Carritos) => {
            console.log( 'LBS');
            if (err) {
                res.json({
                    exito: false,
                    err
                });
            }else{
    
                res.json({
                    exito: true,
                    Carritos
                });
            }
            console.log(Carritos);
        });
            
    
    });
        

module.exports = app;