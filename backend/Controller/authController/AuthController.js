const bcrypt = require("bcrypt");
const User = require("../../models/auth/authModel.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const Register = async (req, res) => {
  try {
    const {phone, email, password,address } = req.body;

    if(!phone){
      return res.status(400).send('phone is required')
    }
    if (!email) {
      return res.status(400).send("email is required");
    }
    if (!password) {
      return res.status(400).send("passwrod is required");
    }
    if (!address) {
      return res.status(400).send("address is required");
    }

    const newPass = await bcrypt.hash(password, 10);
    const result = await User.create({
      phone:phone,
      email: email,
      password: newPass,
      address: address
    });

    return res.status(200).json({ message: "true" });
  } catch (error) {
    return  console.log(error);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).send("email is required");
    }
    if (!password) {
      res.status(400).send("passwrod is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).send("user not found");
    }
    const result = bcrypt.compare(password, user.password);

    if (!result) {
      res.status(400).send("wrong password");
    }

    
    const token =  jwt.sign({ userId: user._id }, secret, {
      expiresIn: "15min",
    });
    
    const role  = user.role;
    const id = user._id;

    res.status(200).json({token,role,id});
  } catch (error) {
    console.log(error);
  }
};

// middleware for authorization
const isLoggedin = async (req, res,next) => {
  let token = req.header('Authorization');
  if (!token) return res.status(401).json({ token});  
  
  try {
    const decoded = jwt.verify(token, secret);
    console.log('Decoded:', decoded);
     next()
  } catch (error) {
    console.log('Error verifying token:', error.message);
    // Handle the error (e.g., return an error response)
  }
};


const isAdmin = async (req, res,next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ token});

  const role = req.header('Role');
  if(!role) return res.status(401).json({role});
  

  try {
    const decoded =  jwt.verify(token, secret);
    
    req.userId = decoded.userId;
    
    if(role == 'admin'){
      console.log("isadming working");
      next();
      
    }
    
  } catch (error) {
    
    console.log(error); 
  }
};

module.exports = { Register, Login, isLoggedin,isAdmin };
