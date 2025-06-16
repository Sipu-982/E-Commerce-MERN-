// const express= require('express')
const paymentModel= require('../Models/Payment')

const makePayment= async (req,res)=>{
    try {
        const {fullname,phone,address,paymentMethod,totalAmount}= req.body
        if(!fullname || !phone || !address || !paymentMethod || !totalAmount){
            return res.status(400).json({message:"All fields are required!"})
        }
        const createPayment= await paymentModel.create({fullname,phone,address,paymentMethod,totalAmount})
        await createPayment.save()
        res.status(201).json({message:"Payment made successfully!",data:createPayment})
    } catch (error) {
        console.error("Payment validation failed",error);
        return res.status(500).json({error:"Internal server failed!"})
    }
}

module.exports= {makePayment}