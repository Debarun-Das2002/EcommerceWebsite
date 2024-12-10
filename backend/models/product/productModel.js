const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: "String",
    required: true,
  },
  img: {
    type: "String",
    required: true,
  },
  quantity:{
    type: "String",
    default : "0",
    
  },
  price: {
    type: "String",
    required: true,
    
  }
});

module.exports = mongoose.model("Product", ProductSchema);
