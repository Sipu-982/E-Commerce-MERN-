const addressModel= require('../Models/UserAddress')
const Payment = require('../Models/Payment');
const Product= require('../Models/AddProduct')

const createAddress= async(req,res) =>{
    try {
        const {fullname,phone,pincode,state,city,house,area,type}= req.body
        if(!fullname || !phone || !pincode || !state || !city || !house || !area){
         return res.status(400).json({message:"All fields are required!"})
        }
         const createArea= new addressModel({fullname,phone,pincode,state,city,house,area,type})
         await createArea.save()
         return res.status(201).json({message:"Addreess added successfully!",data:createArea})
    } catch (error) {
         console.error(error);
        return res.status(500).json({error:"Internal server error"})
    }
}

const viewAddress= async(req,res)=>{
    try {

       const getAddress= await addressModel.find()
       if(getAddress.length===0){
       return res.status(404).json({message:"Address records not found!"})
       }
       return res.status(200).json({message:"Address fetched successfully!",data:getAddress}) 
    } catch (error) {
                console.error(error);
        return res.status(500).json({error:"Internal server error"}) 
    }
}

const deleteAddress = async (req,res)=>{
    try {
        const {id}=req.params;
        const findAddressRemove= await addressModel.findByIdAndDelete(id)
       if(!findAddressRemove){
         return res.status(404).json({message:"Address is not available!"})
       }
       return res.status(201).json({message:"Address removed successfully!",deletedData:findAddressRemove})
    } catch (error) {
         console.error(error);
        return res.status(500).json({error:"Internal server error"}) 
   
    }
}


const getAllOrders = async (req, res) => {
  try {
    const orders = await Payment.find()
      .populate({
        path: 'productIds',
        select: 'title brand imageUrls price'
      })
      .sort({ createdAt: -1 }); 

   return res.status(200).json({ message:"Order fetched successfully!",Orders:orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
   return res.status(500).json({ message: "Server Error" });
  }
};

const deleteOrder= async (req,res)=>{
  try {
      const {id}= req.params;
      const findOrderAndDelete= await Payment.findByIdAndDelete(id)
      if(!findOrderAndDelete){
      return  res.status(404).json({message:"Order doesn't exist!"})
      }
     return res.status(201).json({message:"Order Canceled successfully!",deletedOrder:findOrderAndDelete})
  } catch (error) {
        console.error("Error fetching orders:", error);
   return res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports= {createAddress,viewAddress,deleteAddress,getAllOrders,deleteOrder}