const express= require('express')
const { makePayment } = require('../Controllers/PaymentController')
const authenticateSeller = require('../Middleware/AuthMidlleware')
const router = express.Router()

router.post('/makePayment',authenticateSeller,makePayment)
module.exports=router