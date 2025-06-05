const express= require('express')
const dotenv= require('dotenv').config()
const mongoDB= require('./Config/MongoDB')
const productRoutes= require('./Routes/ProductRoute')
// const mongoose=  require('mongoose')
const cors= require("cors")
const app= express()

app.use(cors())
app.use(express.json())
mongoDB()
const PORT = process.env.PORT || 3004

app.use('/api/product',productRoutes)

app.listen(PORT,()=>{
    console.log(`The server is running on ${PORT}`);
    
})