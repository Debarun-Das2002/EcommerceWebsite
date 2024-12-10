const express = require("express");
const router = express.Router();

const {
  Register,
  Login,
  isLoggedin
} = require("../../Controller/authController/AuthController.js");

router.post("/register", Register);
router.post("/login",Login);


module.exports = router;
