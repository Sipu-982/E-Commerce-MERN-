const mongoose = require('mongoose')
const addressSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true,
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    house:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['Home','Work'],
        default:'Home'
    }
},{timestamps:true})

const addressModel= mongoose.model('Address',addressSchema)

module.exports=addressModel