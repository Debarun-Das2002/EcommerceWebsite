
const Product = require('../../models/product/productModel.js');

const fs = require('fs');
const path = "./uploads/";



const AddProduct = async(req, res) => {
  try {
    const { name, description, category, img,price } = req.body;
    if (!name) {
     return  res.status(400).send("name is required");
    }
    if (!description) {
    return res.status(400).send("description is required");
    }
    if (!category) {
      return  res.status(400).send("category is required");
    }
    if (!img) {
     return res.status(400).send("img is required");
    }
    if (!price) {
      return  res.status(400).send("price is required");
    }

    const result = await Product.create({
      name,
      description,
      category,
      img,
      price
    })

    

    res.status(200).json({ success: "true" });
  } catch (error) {
    console.log(error);
  }
};

const AllProducts = async(req,res) =>{
  try{
    const user = await Product.find({});

    if(!user){
      return res.status(400).send("not found");

    }
    res.status(200).json({user});
  }
  catch(error){
    console.log(error);
  }
}

const OneProduct = async(req,res) => {
  try{
    const {id} = req.params;

    const user = await Product.findById(id);
    if(!user){
      return res.status(400).send("product not found");
    }

    
    res.status(200).json({user});
  }
  catch(error){
    console.log(error);
  }
}

const UpdateProduct = async(req,res) =>{
  try{
    const {id} = req.params;

    const { name, description, category, img ,price} = req.body;
    if (!name) {
      return res.status(400).send("name is required");
    }
    if (!description) {
     return res.status(400).send("description is required");
    }
    if (!category) {
     return res.status(400).send("category is required");
    }
    if (!img) {
     return res.status(400).send("img is required");
    }
    if (!price) {
     return res.status(400).send("price is required");
    }

    const newUser = ({
      name,description,category,img,price
    })
    
    await Product.findByIdAndUpdate(id,newUser);
    res.status(200).json({success: true});
    
  }
  catch(error){
    console.log(error);
  }
}

const DeleteProduct = async(req,res) =>{
  try{
    const {id} = req.params;
    const pro = await Product.findById(id);
    const img =  pro.img;
    
    fs.unlink(`${path}${img}`,(error)=>{
      if(error){
        console.log(error,"cant delete");
      }
    });


    //const product = await Product.findByIdAndDelete(id);
    await Product.findByIdAndDelete(id);
    res.status(200).json({message: "deleted"});

  }
  catch(error){
    console.log(error);
  }
}

// for all Orders
const Order = require("../../models/orders/orderModel.js")
const User = require("../../models/auth/authModel.js")
const allOrders = async(req,res) => {
  try{
      const orders = await Order.find({});

      if(!orders){
       return res.status(400).Json({message: "orders not found"});
      }

      res.status(200).json({orders});
  }
  catch(error){
    console.log(error);
  }
}

const oneOrder = async(req,res)=>{
  try{
      const {id} = req.params;
      const {oid} = req.body;
      const user = await User.findById(id);
      if(!user){
        return res.status(400).json("user not found");

      }

      const cart  = user.orderHistory;

      for(let i=0;i<cart.length;i++){
        let x = cart[i].id;
        const result = {
          phone: user.phone,
          email: user.email,
          address: user.address,
          cart : cart[i]
        }
        if(x == oid){
           return res.status(200).json({result});

        }
       
          
      }

      res.status(200).json({cart});
  }
  catch(error){
    console.log(error);
  }
}




module.exports = { AddProduct,AllProducts,OneProduct,UpdateProduct, DeleteProduct,allOrders,oneOrder};
