module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || 'mongodb+srv://lbelbook:lbelbook123@cluster0.isxwv.mongodb.net/lbelbook?retryWrites=true&w=majority',
    SECRET_TOKEN: "f91ebb26628d2936e43f4165905942971a140bcd8ee75cdc1556c8114044d175"
}