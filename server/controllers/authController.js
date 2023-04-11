const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

function validatePassword(password) {
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,12}$/.test(
      password
    )
  ) {
    throw new Error(
      "The password must contain at least 5 and maximum 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character."
    );
  }
}

exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    validatePassword(password);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    await newUser.save();
    let token = "";
    if (newUser) {
      token = jwt.sign({ id: newUser._id }, process.env.JWT);
      res.cookie("token", token);
    }
    res.status(200).json({
      status: "success",
      user: newUser,
      message: "User has been signed in!",
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("No such user exists! Please register first.");
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new Error("Enter Correct password");
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT
    );
    res.cookie("token", token);
    res.status(200).json({
      status: "success",
      message: "User has been logged in!",
      user: user,
    });
  } catch (err) {
    next(err);
  }
};
