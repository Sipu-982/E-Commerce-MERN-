const mongoose= require('mongoose')

const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    discountPrice:{
        type:String,
        required:true
    },
    ratings: {
        type: String,
        required:true,
        default: 0
    },
    category:{
        type:String,
        enum:["Laptop","Shirt","Jean","Mobile","Electronic","Shoe","Watch","Bag","Toy","Grocery"],
        required:true
    },
     description:{
        type:String,
        required:true
    },
    imageUrls:{
        type:String,
        required:true
    },
    // customer:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User',
    //     required:true
    // }

},{timestamps:true})

const productModel= mongoose.model('Product',productSchema)
module.exports=productModel