const express= require('express')
const { createAddress, viewAddress, deleteAddress, getAllOrders, deleteOrder } = require('../Controllers/AddressController')
const authenticateSeller = require('../Middleware/AuthMidlleware')
const router= express.Router()

router.post('/create',authenticateSeller,createAddress)
router.get('/viewAddress',authenticateSeller,viewAddress)
router.get('/get-orders',authenticateSeller, getAllOrders);
router.delete('/delete-order/:id',authenticateSeller, deleteOrder);
router.delete('/deleteAddress/:id',authenticateSeller,deleteAddress)
module.exports=router;