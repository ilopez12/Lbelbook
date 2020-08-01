var express = require('express');
var  app = express();

var libro_ruta = require('./routeLibro');
var usuario_ruta = require('./Routeusuario');
var login_ruta = require('./RoutesLogin');


app.use(libro_ruta);
app.use(usuario_ruta);
app.use(login_ruta);

module.exports = app;
