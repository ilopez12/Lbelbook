var express = require('express');
var app = express();
const bcrypt = require('bcrypt');

var resena = require('../Models/resena');

const {verificadorToken} = require('../middleware/autenticacion')

app.get('/resena/All/add', function (req, res, next) {

    var id = req.params.id;
 
    resena.find(function(err, docs){
    var productChunks = [];
    var ChunkSize = 3; 
    for (var i = 0; i < docs.length; i += ChunkSize){
        productChunks.push(docs.slice(i, i+ChunkSize));
        
        
    //    console.log(total);
    }
    res.json({
        title: 'LEBLBOOK89', 
        resena: docs,
        tamano : docs.length, 
        suma : 4,
    });

}).lean()
//console.log($sum);
});
 

app.get('/', async (req, res)=>{
    var id = req.params.id;
    resena.find( function(err, docs){
        var productChunks = [];
        var ChunkSize = 3;
        for (var i = 0; i < docs.length; i += ChunkSize){
            productChunks.push(docs.slice(i, i+ChunkSize));
        }
        res.render('../public/views/', { 
            title: 'PLebelbook', 
            resenas: docs
          });
    }).lean()
    //const dataLoaded = await libros.find({});

   /* res.render('../public/views/', { 
      title: 'Productos', 
      dataLoaded: dataLoaded,

      //carrito: cartList
    });*/

    //console.log('RESEÑA'+resenas);
  });
module.exports = app;