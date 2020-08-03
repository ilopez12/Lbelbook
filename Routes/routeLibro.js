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
    //id de la categoria
   
    //var id_categoria = req.body;
  //  console.log(id_categoria.categoria);
   // var id_categoria = req.params.categoria;

 //  libros.find({ categoria: id_categoria.categoria}, (err, librodb) => {
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


            });
        }

    });

        console.log( 'ENTRO AKI');

});

app.get('/libros/categoria/:id', async (req, res)=>{
    var id = req.params.id;
   // const cartList = await cartListAsync({userLogin: req.user}).then((data)=>data)
    const dataLoaded = await libros.find({categoria: id})
    .exec((err, librosdb) => {
        if (err) {
            res.status(400).json({
                exito: false,
                err: {
                    message: 'No existe categoria' 
                }
            });
        }
  
    /*res.render('../public/views/listar.hbs', { 
      title: 'Productos', 
      data: dataLoaded,
      breadcumb1:'Inicio',
      //carrito: cartList 
    });*/
    res.json({
        exito: true, 
        librosdb
    });

    console.log(libros);
  });

//app.get('/libros/categoria/:id', (req, res) => {

  /*  var id = req.params.id;

    libros.find({ categoria: id})
        .exec((err, librosdb) => {
            if (err) {
                res.status(400).json({
                    exito: false,
                    err: {
                        message: 'No existe categoria' 
                    }
                });
            }

          /* res.json({
                exito: true, 
                librosdb
            });*/
         /* res.render('../public/views/listar.hbs', {librosdb});
            console.log(librosdb);
        }); */
         
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

module.exports = app;  