const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        enum:['cod','upi','card'],
        required:true
    },
      productIds: [{ type: mongoose.Schema.Types.ObjectId,
         ref: 'Product' }],
    totalAmount:{
        type:String,
        required:true
    },

},{timestamps:true})

const paymentModel= mongoose.model('Payment',paymentSchema)
module.exports=paymentModel