const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  phone:{
    type: String,
    require: true
  },
  email: {
    type: String,
    requrie: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  role:{
    type: String,
    default: "user",
    
  },
  
  orderHistory: [{
    orderId: mongoose.Schema.Types.ObjectId,
    total: Number,
    payment : String,
    updatedAt: {
      type: Date,
      default : new Date()
    },
    status: {
      type: String,
      default: "pending"
    },
    cart : [{}]
  }]

},{timestamps: true});
  
module.exports = mongoose.model("User", UserSchema);
