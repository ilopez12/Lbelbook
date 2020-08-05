var express = require('express');
var app = express();
const bcrypt = require('bcrypt');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ARxU577EY1RGDg1YYqlf4EZEd0lirC83o6QIwI1IC-m4dQjGsUzTM2mbDBKchTLAldrhYoUlOy2LTWGO',
  'client_secret': 'ECaPuyCTYqHVDsFTANs7oTmQfp6iZn9b3RXmhzkv-X2hbyiW5EDp-GXo_PINrhvOQnAB3cdOrMcaVJya'
});

app.post('/paypal', (req, res) =>{
    var data = req.body;
    console.log('esta aqui');

    console.log(req.body.amount);
    console.log(req.params.amount);
    let create_payment_json = {

        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "/",
            "cancel_url": "/"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "d",
                    "sku": "item",
                    "price": "25",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25",
            },
            "description": "Compra"
        }]
    };


    paypal.payment.create(create_payment_json, function (error, payment) {
        console.log('entro');
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
              res.redirect(payment.links[i].href);
            }
     }
    } 
});

});






app.get('/success', (req, res)=>{
    var data = req.body;
    const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

    const execute_payment_json ={
        "payer_id":payerId,
        "transactions":[{
            "amount":{
                "currency": "USD",
                "total" :"26",
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment){
        if(error){
            console.log(error.response);
            throw error;
        }else{

            console.log(JSON.stringify(payment));
            res.send('Listo')
        }
    });
});


app.get('/cancel', (req, res)=>res.send('Cancelado'));


module.exports = app;   