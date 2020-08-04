var express = require('express');
var  app = express();

var libro_ruta = require('./routeLibro');
var usuario_ruta = require('./Routeusuario'); 
var login_ruta = require('./RoutesLogin');
var carrito_ruta = require('./RouteCarrito');
var pago_ruta = require('./RoutePago');
var resena_ruta = require('./Routeresena'); 

const customerCtrl = require('../Controller/customer')
const categoriatCtrl = require('../Controller/categoria')
const librotCtrl = require('../Controller/libro')
const sliderCtrl = require('../Controller/slider')
const resenaCtrl = require('../Controller/resena')
const auth = require('../middleware/auth')
const auth2 = require('../middleware/autenticacion')
const api = express.Router()


app.post('/signup/',customerCtrl.signUp)
app.post('/sigin/',customerCtrl.signIn)
app.get('/customer/',customerCtrl.getAllCustomer)
app.get('/customer/:customerId',customerCtrl.getCustomerInformation)
app.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Access' })
  })
 
// SERVICES CATEGORIA
app.get('/categoria/', categoriatCtrl.getCategories)
app.post('/categoria/',categoriatCtrl.saveCategoria)
// SERVICES LIBRO
app.get('/libro/', librotCtrl.getLibros)
app.get('/libro/id/:libro_id',librotCtrl.getLibroByID)
app.get('/libro/categoria/:categoria_id',librotCtrl.getLibroByCategoria)
app.post('/libro/', librotCtrl.saveLibro)
// SERVICES RESENA
app.get('/resena/', resenaCtrl.getResena)
app.get('/resena/libro/:id_libro', resenaCtrl.getResenaByLibro)
app.post('/resena/', resenaCtrl.saveResena)
// SERVICES SLIDER
app.get('/slider/', sliderCtrl.getSlider)
app.post('/slider/', sliderCtrl.saveSlider)


app.use(libro_ruta);
app.use(usuario_ruta);
app.use(login_ruta);
app.use(carrito_ruta);
app.use(pago_ruta);
app.use(resena_ruta);

module.exports = app;
