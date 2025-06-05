const express= require('express')
const { addProduct, searchProduct, findProduct, filterProduct, updateProduct, getProductById } = require('../Controllers/ProductController')
const router= express.Router()
const multer= require('multer')
const storage= multer.memoryStorage()
const upload= multer({storage})

router.post('/addProduct',upload.single("image"),addProduct)
router.get('/findProducts',findProduct)
router.get('/searchProduct',searchProduct)
router.get('/filterProduct',filterProduct)
router.get('/getProductById/:id',getProductById)
router.put('/updateProduct/:id',upload.single("image"),updateProduct)
module.exports=router