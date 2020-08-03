'use scrict'

const Customer = require('../Models/customer');
const service = require('../services')
const bcrypt = require('bcrypt')

function signUp(req,res){
    const customer = new Customer({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.address,
        birthday: req.body.birthday,
        avatar:req.body.avatar,
        password: req.body.password

    })
     
    customer.save((err) => {
        
        if(err) res.status(500).send({message: `Error creating the customer: ${err}`})
        res.status(200).send({token: service.createToken(customer)})

    })
}

function signIn (req, res) {

    let customer = new Customer({
      email: req.body.email,
      password: req.body.password
    })
    
    Customer.findOne({email: customer.email}, function (err, customerfind) {
      if (err) return res.status(500).send({message: `Internal error server: ${err}`})
      if (!customerfind) return res.status(401).send({message: `The requested resource requires user authentication.`})
    
      bcrypt.compare(customer.password, customerfind.password, function (err, isMatch) {
        
        if (err) return res.status(500).send({message: `Internal error server: ${err}`})


        if (isMatch) {
          res.status(200).send({
            message: 'Login successful',
            token: service.createToken(customerfind)
          })
        } else {
          res.status(401).send({
            message: 'Fallo de autenticacion',
            token: null
          })
        }


      })
    })
    
  }
  

  function getCustomerInformation(req,res)
  {
  
  
  
  let customerId = req.params.customerId
  
  Customer.findById(customerId, (err,customer) => {
  
   if(err) return res.status(500).send({message: `Error making the request: ${err}`})

   if(!customer) return res.status(404).send({message: `The customer does not exist`})
  
  res.status(200).send({customer});
  
  
  
  })



}


function getAllCustomer(req,res)

{

Customer.find({}, (err,customer) => {

if(err) return res.status(500).send({message: `Error making the request: ${err}`})

if(!customer) return res.status(404).send({message: `The customer does not exist`})

res.status(200).send({customer});

})

}

module.exports = {
    signUp,
    signIn,
    getCustomerInformation,
    getAllCustomer
}
