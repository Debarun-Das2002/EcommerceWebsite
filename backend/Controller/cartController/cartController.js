const User = require('../../models/auth/authModel.js')
const Product = require('../../models/product/productModel.js');
const Order = require('../../models/orders/orderModel.js')

const myOrders = async(req,res) => {
    try{
        const {id} = req.params;
       
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({message: 'not found'})
        }
        
        res.json({user})
    }
    catch(error){
        console.log(error);
    }

}

const getOrder = async(req,res)=>{
    try{
        const {id} = req.params;
       
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({message: 'not found'})
        }
        
        res.json({user})
    }
    catch(error){
        console.log(error);
    }
}

const addOrder = async(req,res)=>{
    try{
        const {id} = req.params;
      
        const user = await User.findById(id);
        if(!user){
           return  res.status(400).json({message: "user not found"});
        }
        
          user.orderHistory.push(req.body);
          user.save();
        const n = user.orderHistory.length;
        const orderId = user.orderHistory[n-1].id;

       //working for add to user orders X
     
      /// res.status(200).json({orderId});


         //adding the user to the admin orders panel
         
        const data = {
            userId : id,
            orderId : orderId,
            total: req.body.total,
            payment: req.body.payment,
            updatedAt: req.body.updatedAt
        }
        
        const result  = await Order.create(data);
        console.log(result);
        res.status(200).json({success: "true"});

    }
    catch(error){
        console.log(error);
    }
}

// this edit order is only for admin 
const editOrder = async(req,res)=>{
    try{
        const {id} = req.params;
        const {oid,status} = req.body

        const user = await User.findById(id);
        const order = await Order.findOne({orderId : oid});
        if(!user){
            return res.status(400).json({message: ' user not found'})
        }
        if(!order){
            return res.status(400).json({message: ' order not found'})
        }

        const arr = user.orderHistory;
        let x ;
        
        for(let i =0;i<arr.length;i++){
            if(oid == arr[i].id){
                arr[i].status = status,
                user.save();
            }
        }
        order.status = status;
        order.save();

    
        res.status(200).json({success: "true"})
        
    }
    catch(error){
        console.log(error);
    }
}



const removeOrder = async(req,res)=>{
    try{
        const {id} = req.params;
        const {uid} = req.body

        const user = await User.findById(uid);

        if(!user){
            return res.status(400).json({message: 'not found'})
        }

        let arr = [];

        arr = user.cart.items;

        for(let i = 0;i<arr.length;i++){
           // console.log(arr[i].quantity)
            if(arr[i]._id == id){
                if(arr[i].quantity > 0){
                    arr[i].quantity = arr[i].quantity-1;
                   
                }
                if(arr[i].quantity<1){
                    
                    await user.cart.items.remove(id);
                }

              
            }
        }
       // console.log(arr);
         
        user.save();
      
        res.json({user})
        
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {addOrder,removeOrder,getOrder,editOrder,myOrders}