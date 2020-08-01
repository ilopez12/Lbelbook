require('dotenv').config()
const express = require('express');
const body_parse = require('body-parser');
var hbs = require('express-hbs');
const mongoose = require('mongoose');
const connectDb = require('./dbConfig');

const app = express(); 
const PORT = 3000;

var path = require('path');
//Routes 
var routes = require('./Routes/index');
var routes = require('./Routes/categorias');

app.use(body_parse.urlencoded({ extended: false }));
app.use(body_parse.json({ limit: '50mb' }));

app.use('/public', express.static(path.join(__dirname, './public')));

app.engine('hbs', hbs.express4({
   partialsDir: __dirname + '/public/views/partials'
 }));
 
app.set('view engine', 'hbs');
app.set('views', __dirname + '/public/');

app.use(require('./Routes/index'));
app.use(require('./Routes/rutasindex'));


connectDb().then((res 
 ) => {
  console.log(res);
    app.listen(PORT, () => {
      console.log(`Ejecutando en el puerto ${PORT}`);
    });
 });