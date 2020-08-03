const mongoose = require('mongoose');

const MONGO_URL = `process.env.MONGODB_SERVER`;

/*const mongoOptions = {
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASSWORD,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
*/

/*mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
  (err, res) => {
      if (err) {
          console.log(err);
      }
      console.log('Base de datos Conectada ONLINE');
  })*/
//VENCIMIENTO DEL TOKEN
//60 *60
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30 ;
//SEED DE AUTENTICACION
process.env.SEED = 'secret';



const connectDb = () => mongoose.connect('mongodb+srv://lbelbook:lbelbook123@cluster0.isxwv.mongodb.net/lbelbook?retryWrites=true&w=majority');

module.exports = connectDb;