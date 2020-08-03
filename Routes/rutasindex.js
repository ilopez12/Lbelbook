var express = require('express');
var app = express();
const {verificadorToken} = require('../middleware/autenticacion')
let libro = 

app.get('/', (req, res) => {   

    res.render('../public/views/', { title: 'LEBLBOOK ', estatus: verificadorToken });
  });
  
  app.get('/categorias', (req, res) => {   
  
    res.render('../public/views/categorias.hbs', { title: 'Categorias ' });
  });
  
  app.get('/register', (req, res) => {   
  
    res.render('../public/views/registro.hbs', { title: 'Registro' });
  });

  app.get('/login', (req, res) => {   
  
    res.render('../public/views/login.hbs', { title: 'Login ' });
  });

  app.get('/result', (req, res) => {   
  
    res.render('../public/views/listar.hbs',  { 
      nombre : 'HOLA', 
      autor: 'GF',
   });
  });

  app.get('/pay', (req, res) => {   
  
    res.render('../public/views/pago.hbs',  { 
      nombre : 'HOLA', 
      autor: 'GF',
   });
  });


module.exports = app;