var express = require('express');
var app = express();
var libros = require('../Models/Libro');
const {verificadorToken} = require('../middleware/autenticacion')



// crear todas las categorias
app.post('/libros/create', (req, res) => { 

var data= req.body;
    let Libro = new libros({
        nombre: 'OYE MORENA',
        codigo: 15,
        precio: '15',
        cantidad: '6',
        descripcion: 'Coral es una chica independiende que vive en lejos de casa',
        img: '../public/img/portada/oyemorena.jpg',
        estado: true,
        id_categoria: '9',
        categoria: 'Romance'
    });

    Libro.save((err, librodb) => {
        if (err) {
            res.json({
                exito: false,
                err
            });
        }else{

           // res.render('../public/views/index.hbs', { title: 'LEBLBOOK ' });
            res.json({
                exito: true,
                Libro: librodb
               
            });
            
            console.log(Libro);
        }

    });

});

app.get('/libros/:categoria', verificadorToken, (req, res) => {
    //id de la categoria
    var id_categoria = req.params.categoria;

    libros.findById({ _id: id_categoria }, (err, librodb) => {
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

module.exports = app;