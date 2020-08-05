require('dotenv').config()
const express = require('express');
const body_parse = require('body-parser');
var cookieParser = require('cookie-parser')
var hbs = require('express-hbs');
const paypal = require('paypal-rest-sdk');
const mongoose = require('mongoose');
const connectDb = require('./dbConfig');
const formData = require('express-form-data');


const app = express(); 
const PORT = 3000;

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ARxU577EY1RGDg1YYqlf4EZEd0lirC83o6QIwI1IC-m4dQjGsUzTM2mbDBKchTLAldrhYoUlOy2LTWGO',
  'client_secret': 'ECaPuyCTYqHVDsFTANs7oTmQfp6iZn9b3RXmhzkv-X2hbyiW5EDp-GXo_PINrhvOQnAB3cdOrMcaVJya'
});

var path = require('path');
//Routes 
var routes = require('./Routes/index');

app.use(formData.parse())
app.use(cookieParser())

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