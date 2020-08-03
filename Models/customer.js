"use strict";

const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const CustomerSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  status:  { type: String, required: true, default: 'A'},
  phone: { type: String, required: true },
  birthday: { type: Date, required: true },
  avatar: { type: String, required: true },
  password: { type: String, required: true },
  signupDate: { type: Date, default: Date.now(), required: true },
  lastLogin: { type: Date }
});

CustomerSchema.pre("save", function (next) {
  var user = this;
  console.log(this);
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      console.log("HASH:" + hash);
      return next();
    });
  });
});

module.exports = mongoose.model("Customer", CustomerSchema);
