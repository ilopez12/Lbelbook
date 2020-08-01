var express = require('express');
var app = express();
const {verificadorToken} = require('../middleware/autenticacion')

app.get('/', (req, res) => {   

    res.render('../public/views/', { title: 'LEBLBOOK ', estatus: verificadorToken });
  });
  
  app.get('/categoria', (req, res) => {   
  
    res.render('../public/views/categorias.hbs', { title: 'Categorias ' });
  });
  
  app.get('/register', (req, res) => {   
  
    res.render('../public/views/registro.hbs', { title: 'Registro' });
  });

  app.get('/login', (req, res) => {   
  
    res.render('../public/views/login.hbs', { title: 'Login ' });
  });


module.exports = app;