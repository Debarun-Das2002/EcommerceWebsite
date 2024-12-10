const express  = require('express');
const router = express.Router();

const {addOrder,removeOrder,getOrder,editOrder,myOrders} = require('../../Controller/cartController/cartController.js')

router.get('/myOrders/:id',myOrders)
router.get('/Order/:id',getOrder);
router.post('/addtoCart/:id',addOrder)
router.post('/editOrder/:id',editOrder) // only admin can 
router.put('/removeOrder/:id',removeOrder)

module.exports = router;
    