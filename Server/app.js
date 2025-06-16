const express= require('express')
const dotenv= require('dotenv').config()
const mongoDB= require('./Config/MongoDB')
const productRoutes= require('./Routes/ProductRoute')
const AuthRoutes= require('./Routes/AuthRoutes')
const cors= require("cors")
const app= express()
const cartRoute = require('./Routes/CartRoutes');
const addressRoute= require('./Routes/AddressRoute')
const PaymentRoute= require('./Routes/PaymentRoutes')

app.use(cors())
app.use(express.json())
mongoDB()
const PORT = process.env.PORT || 3004

app.use('/api/product',productRoutes)
app.use('/api/auth',AuthRoutes)
app.use("/api/cart", cartRoute);
app.use("/api/address",addressRoute);
app.use('/api/payment',PaymentRoute)
app.listen(PORT,()=>{
    console.log(`The server is running on ${PORT}`);
    
})