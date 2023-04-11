const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.getUserDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.status(200).json({
      status: "Sucess",
      message: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.editUserDetails = async (req, res, next) => {
  try {
    const { email, name, prevPassword, newPassword } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    let isUpdatePossible = true;
    if (newPassword) {
      isUpdatePossible = await bcrypt.compare(prevPassword, user.password);
      if (!isUpdatePossible) {
        throw new Error("Enter Correct initial password");
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPassword, salt);
      user.password = hash;
    }
    if (name) {
      user.name = name;
    }
    await user.save();
    res.status(200).json({
      status: "Success",
      message: "User has been updated!",
    });
  } catch (err) {
    next(err);
  }
};
