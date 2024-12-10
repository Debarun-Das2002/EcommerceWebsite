const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
var cors = require('cors')
app.use(cors());

require("dotenv").config();
const db = process.env.DB;
const { connectTodb } = require("./db.js");

const authRoutes = require("./router/auth/authRouter.js");
const productRoutes = require('./router/product/productRouter.js');
const cartRoutes = require('./router/cart/cartRoute.js')

app.use("/auth", authRoutes);
app.use('/products',productRoutes);
app.use('/user',cartRoutes);

// for images
app.use(express.static('public'));
app.use('/images',express.static('uploads'));


app.get("/", (req, res) => {
  res.status(200).send("working");
});
app.listen(8000, () => {
  console.log(`db is ${db}`);
  connectTodb(db);
  console.log("live");
});
