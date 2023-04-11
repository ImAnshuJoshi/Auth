const express = require("express");
const {
  getUserDetails,
  editUserDetails,
} = require("../controllers/userController");
// const auth = require("../Middlewares/authToken");
const router = express.Router();

router.get("/user/:id", getUserDetails);
router.post("/user/edit", editUserDetails);

module.exports = router;
