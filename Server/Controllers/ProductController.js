const productModel= require('../Models/AddProduct')
const streamifier = require("streamifier");
const cloudinary = require("../Config/cloudinary");

const addProduct= async(req,res)=>{
    try {
        const {title,brand,price,discountPrice,ratings,category,description}= req.body

        if (!req.file) {
        return res.status(400).json({ message: "Image file is required!" });
}
      if (!title || !brand || !price || !discountPrice || !ratings || !category || !description) {
      return res.status(400).json({ message: "All text fields are required!" });
}
        const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: process.env.CLOUDINARY_PRODUCT_FOLDER },
        (error, result) => {
          if (error) {
            console.error("Cloudinary error:", error);
            return reject(error);
          }
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

        const createProduct= new productModel({
         title,
         brand,
         price,
         discountPrice,
         ratings,
         category,
         imageUrls:result.secure_url,
          description,
          // customer:req.user._id

        })
        await createProduct.save();
      return res.status(201).json({message:"Product successfully added!",data:createProduct})
    } catch (error) {
            console.error(error);
    return res.status(500).json({ error: "Product creation failed!" });

    }
}

const findProduct = async (req,res)=>{
  try {
    const getProducts= await productModel.find()
    if(getProducts.length===0){
     return res.status(404).json({ message: "Product not found!" });
    }
    return res.status(200).json({ message: "Product successfully found!", data:getProducts });
  } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });

  }
}

const getProductById = async (req,res)=>{
  try {
    const {id}= req.params;
    const getProduct= await productModel.findById(id)
    if(!getProduct){
            return res.status(404).json({ message: "Product not found!" });
    }
    return res.status(200).json({
      success: true,
      message: "Product founded successfully!",
      data: getProduct,
    });
  } catch (error) {
        console.error("Search error:", error); 
        return res.status(500).json({ message: "Something went wrong!" });

  }
}

const searchProduct = async (req, res) => {
  try {
    const { title,brand } = req.query;
    if (!title && !brand) {
      return res.status(400).json({ message: "Please provide at least one search query (title or brand)." });
    }
   const query = {};
   if(title){
    query.title={$regex: title, $options: "i"}
   }
   if(brand){
    query.brand={ $regex:brand, $options:"i"}
   }
     const fetchProduct = await productModel.find(query);
    if (!fetchProduct || fetchProduct.length === 0) {
      return res.status(404).json({ message: "Product not found!" });
    }

    return res.status(200).json({ message: "Product successfully found!", data: fetchProduct });
    
  } catch (error) {
    console.error("Search error:", error); 
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

const filterProduct=async(req,res)=>{
  try {
       const {category,brand,ratings}= req.query
       const filterData= {}
       if (category) filterData.category = { $regex: category, $options: "i" };
      if (brand) filterData.brand = { $regex: brand, $options: "i" };
       if(ratings) filterData.ratings=ratings
       
       const filterThings= await productModel.find(filterData)
       if(filterThings.length===0){
        return res.status(404).json({message:"No matched products found!"})
       }
       return res.status(200).json({message:"Filtered products fetched successfully!",filter_Products:filterThings})
  } catch (error) {
   console.error("Search error:", error); 
    return res.status(500).json({ message: "Something went wrong!" });

  }
}

const updateProduct= async (req,res)=>{
  try {

  let imageUrls;
    if(req.file){
      const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: process.env.CLOUDINARY_UPLOAD_FOLDER },
        (error, result) => {
          if (error) {
            console.error("Cloudinary error:", error);
            return reject(error);
          }
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });
    imageUrls=result.secure_url
    }
    const updateData= {...req.body}
    if(imageUrls){
      updateData.imageUrls=imageUrls;
    }
    const modifyProduct= await productModel.findByIdAndUpdate(req.params.id,updateData,{new:true})
    if(!modifyProduct){
      return res.status(404).json({message:"Product not found!"})
    }
     return res.status(201).json({
      success: true,
      message: "Product updated successfully",
      data: modifyProduct,
    });
  } catch (error) {
   console.error(error); 
    return res.status(500).json({ message: "Something went wrong!" });
  }
}

module.exports={addProduct,findProduct,getProductById,updateProduct,filterProduct,searchProduct}