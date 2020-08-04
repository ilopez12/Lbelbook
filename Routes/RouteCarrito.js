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
            cantidad_libro: 1,
            total : datos.precio_libro,
            img_libro : datos.img_libro

        });
    
        Carrito.save((err, carritodb) => {
            if (err) {
                res.json({
                    exito: false,
                    err
                });
            }else{
 
                res.render('../public/views/categorias.hbs', { 
                    title: 'Categoria'
                  });

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
    
app.delete('/carrito/delete/:id', (req, res) => {
    var id_productos = req.params.id
    Carritos.findByIdAndDelete(id_productos, (err, CarritoDB) => {
        if (err) {
            res.status(400).json({
                exito: false,
                err

            });
        }
        if (CarritoDB == null) {
            res.status(400).json({
                exito: false,
                err: {
                    message: `El producto con ID ${id_productos} no EXISTE`
                }
            })
        }
        res.json({
            exito: true,
            producto: CarritoDB
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
 
app.get('/carrito/All/add', function (req, res, next) {
        console.log('carrito');
        var id = req.params.id;
        console.log( 'ENTRO AQUI');
      Carritos.find(function(err, docs){
        console.log('nuevo');
        var total = Carritos.total ;
        var productChunks = [];
        var ChunkSize = 3; 
        for (var i = 0; i < docs.length; i += ChunkSize){
            productChunks.push(docs.slice(i, i+ChunkSize));
            
         //   console.log(total);
        }

        res.render('../public/views/pago.hbs', { 
            title: 'Pago', 
            producto: docs,
            tamano : docs.length, 
            suma : 4,
            estatus: req.cookies.auth 
          });
    }).lean()
//console.log($sum);
    });

// actualizar un Producto
app.put('/carrito/refresh/:id', [verificadorToken], (req, res) => {
    //underscore pick solo coloca los campos que se quieren actualizar en la base de datos
    var data = _.pick(req.body, ['nombre', 'precio', 'cantidad', 'descripcion','estado' ,'id_categoria' , 'id_auto']);
    var id_producto = req.params.id
    productos.findByIdAndUpdate(id_producto, data, { new: true, runValidators: true, context: 'query' }, (err, productoBD) => {
        if (err) {
            res.status(400).json({
                exito: false,
                err: {
                    message: `No se encontro registro con el Id ${id_producto}`
                }
            });
        }

        res.json({
            exito: true,
            producto: productoBD
        });

    });
});
module.exports = app;