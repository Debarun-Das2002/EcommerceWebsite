const express = require("express");
const router = express.Router();

const multer = require('multer');
//const file = require('../../uploads')
// storage for uploaded files
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
      cb(null,'./uploads');
  },

  filename:(req,file,cb) =>{
    cb(null,file.originalname);
  }
})

const upload = multer({storage});


const {isLoggedin,isAdmin} = require('../../Controller/authController/AuthController.js');



const {
  AddProduct,
  AllProducts,
  OneProduct,
  UpdateProduct,
  DeleteProduct,
  allOrders,
  oneOrder
} = require("../../Controller/productController/ProductController.js");

// isloggedin and isAdmin middleware are wroking fine

router.post("/createProduct",isAdmin,upload.single('file'),AddProduct);
router.get('/getProducts',AllProducts); //  for users 
//router.get('/admin/getProducts',isAdmin,AllProducts);// for admin only
router.get('/getOneProduct/:id',isAdmin,OneProduct);
router.put('/updateProduct/:id',isAdmin,UpdateProduct);
router.delete('/deleteProduct/:id',isAdmin,DeleteProduct);
router.get('/allOrders',allOrders) // add is admin later X
router.post('/orders/:id',isLoggedin,oneOrder)

router.post('/uploadImage', upload.single('file'), function (req, res,) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log(req.file, req.body)
});






module.exports = router;
