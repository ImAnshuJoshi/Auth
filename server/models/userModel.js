const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide a name!"],
    minlength: [6, "A name must have more or equal then 6 characters"],
    maxlength: [40, "A name must have less or equal then 40 characters"],
  },
  email: {
    type: String,
    unique: [true, "Email already in use"],
    required: [true, "Provide an email!"],
    minlength: [6, "An email must have more or equal then 6 characters"],
    validate: [validator.isEmail, "Provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Provide a password!"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
