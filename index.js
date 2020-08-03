"use scrict";

const mongoose = require("mongoose");
const os = require("os");
const app = require("./app");
const config = require("./config/config");

mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
  if (err) {
    console.log(`Error establishing a database connection: ${err}`);
    return;
  }

  console.log(`Connection to database established ...`);
  app.listen(config.port, () => {
    console.log(
      `Services for LBELBOOK running .....`
    );
  });
});
