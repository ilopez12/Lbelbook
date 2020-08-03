var express = require('express');
var app = express();
var Pagos = require('../Models/Pagos');
const {verificadorToken} = require('../middleware/autenticacion')

app.post('/pago/add', (req, res) => { 
    var datos= req.body;
    //console.log(datos.monto);
        let Pago = new Pagos({
            monto: datos.monto,
           
        });
    
        Pago.save((err, Pagodb) => {
            if (err) {
                res.json({
                    exito: false,
                    err
                });
            }else{
    
                res.json({
                    ok:true,
                    Pago: Pagodb 
                })
    console.log(Pago);
            }
    
        });
    
    });


module.exports = app;