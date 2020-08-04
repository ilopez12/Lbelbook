var express = require('express');
var app = express();
const {verificadorToken} = require('../middleware/autenticacion');
var cookieParser = require('cookie-parser')
var {libros} = require('../Controller/libro');
var resena = require('./Routeresena');
//let libro = 

/*app.get('/', (req, res) => {   

    res.render('../public/views/', { 
      title: 'LEBLBOOK ', 
      estatus: verificadorToken, 
      libro: libros,
      resena : resena,
    });
  });*/
  
  app.get('/', async (req, res) => {    
  
      await res.render('../public/views/', { 
        title: 'LEBLBOOK ', 
        estatus: req.cookies.auth,
        libro : libros ,
        resena : resena 
       });

       console.log(resena); 
    });
  
    app.get('/logout', async (req, res) => {   
      
      res.clearCookie("auth")
      await res.render('../public/views/', { title: 'LEBLBOOK '});
    });
    
    app.get('/categorias', (req, res) => {   
    
      res.render('../public/views/categorias.hbs', { 
        title: 'Categorias ', 
        estatus: req.cookies.auth 

     }); 
    });
    
    
    app.get('/register', (req, res) => {   
    
      res.render('../public/views/registro.hbs', { title: 'Registro', estatus: req.cookies.auth  });
    });
  
    app.get('/login', (req, res) => {   
    
      res.render('../public/views/login.hbs', { title: 'Login ' , estatus: req.cookies.auth });
    });
  
    app.get('/result', (req, res) => {   
    
      res.render('../public/views/listar.hbs',  { 
        nombre : 'HOLA', 
        autor: 'GF',
        estatus: req.cookies.auth 
     });
    });
  
    app.get('/pay', (req, res) => {   
     
      res.render('../public/views/pago.hbs',  { 
        estatus: req.cookies.auth 
     });
    });

    
  
  

module.exports = app;