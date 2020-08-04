var express = require('express');
var app = express();
var libros = require('../Models/Libro');
const {verificadorToken} = require('../middleware/autenticacion')



// crear todas las categorias
app.post('/libros/create', (req, res) => { 

var data= req.body;
    let Libro = new libros({
        nombre: 'GRANDES CASOS EMPRESARIALES : La gestíonal estilo Disney y Grandes Casos Empresariales, Grandes marcas',
        autor: 'Bill Capodagli',
        codigo: 9788423424726,
        precio: 10.99,
        cantidad: 10,
        descripcion: 'La Gestión al Estilo Disney es un libro que presenta esos secretos que ha llevado al éxito de Walt Disney; este éxito no fue producto de la casualidad, sino de una gestión de innovación y creatividad, además de unos principios bien estructurados por parte de su dueño y fundador los cuales  se han venido cumpliendo al pie de la letra. Este libro ayuda a las empresas a generar una cultura a través del servicio, que redunda en mejorar la calidad de vida de sus trabajadores y usuarios.',
        img: '../public/img/portada/gestiondisney.jpg',
        estado: true,
        id_categoria: '6',
        categoria: 'Negocios'
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

app.get('/libros/', (req, res) => {

    console.log( 'ENTRO AQUI');
  libros.find({})
    .exec((err, libros) => {
        console.log( 'LBS');
        if (err) {
            res.json({
                exito: false,
                err
            });
        }else{

            res.json({
                exito: true,
                libros,
                estatus: req.cookies.auth 

            });
        }

    });

        console.log( 'ENTRO AKI');

});

app.get('/libros/categoria/:id', function (req, res, next) {
    var id = req.params.id;
    libros.find({id_categoria :id}, function(err, docs){
        var productChunks = [];
        var ChunkSize = 3;
        for (var i = 0; i < docs.length; i += ChunkSize){
            productChunks.push(docs.slice(i, i+ChunkSize));
        }
        res.render('../public/views/listar.hbs', { 
            title: 'Productos', 
            producto: docs,
            estatus: req.cookies.auth 
          });
    }).lean()
 
}); 

app.get('/libros/as',  (req, res) => {
    //variable global
    console.log('ENTRO');
    let desde = req.query.desde || 00;

    desde = Number(desde);
    let limite = req.query.limite || 3;
   limite = Number(limite);
    // los parametros opcionaes se mandan ?name_parametro & => si hay otro
    libros.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, libroDB) => {
            console.log('AQUI');
            if (err) {
                res.status(400).json({
                    exito: false,
                    err
                });
                console.log('YELLGO AL NO');
            }

            libros.countDocuments({ estado: true }, (err, conteo) => {
             //   console.log(token);
                res.json({
                    exito: true,
                    libroDB,
                    cantidad: conteo

                    
                })
                console.log('YELLGO AL NO'+conteo);
            });

        });

   
});

app.get('/lok', async (req, res)=>{
    var id = req.params.id;
    libros.find( function(err, docs){
        var productChunks = [];
        var ChunkSize = 3;
        for (var i = 0; i < docs.length; i += ChunkSize){
            productChunks.push(docs.slice(i, i+ChunkSize));
        }
        res.render('../public/views/', { 
            title: 'Lebelbook', 
            libros: docs
          });
    }).lean()
    //const dataLoaded = await libros.find({});

   /* res.render('../public/views/', { 
      title: 'Productos', 
      dataLoaded: dataLoaded,

      //carrito: cartList
    });*/

    console.log(producto);
  });


app.get('/PL/**', async (req, res)=>{
    const dataLoaded = await libros.find({});

    res.render('../public/views/', { 
      title: 'Productos', 
      dataLoaded: dataLoaded,

      //carrito: cartList
    });

    console.log(dataLoaded);
  });

module.exports = app;  