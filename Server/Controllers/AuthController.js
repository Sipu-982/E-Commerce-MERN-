const UserModel = require('../Models/UserModel')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const streamifier = require('streamifier')
const cloudinary = require('../Config/cloudinary')
const { sendEmail } = require('./MailContoller')

const createAccount= async(req,res)=>{
    try {
        const { fullname,email,phone,password,confirmPassword }= req.body
        console.log("Body",req.body);
        
        if(!fullname || !email || !phone || !password || !confirmPassword){
            return res.status(400).json({message:"All fields are required!"})
        }

        const hashPassword= await bcrypt.hash(password,10)
        const findEmail = await UserModel.findOne({email})
        if(findEmail){
           return res.status(409).json({message:"User already exist!"})
        }
         const emailFormat=  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailFormat.test(email)){
            return res.status(400).json({message:"Invalid email address!"})
        }
        const phoneFormat= /^[0-9]{10}$/;
        if(!phoneFormat.test(phone)){
            return res.status(400).json({message:"Invalid Phone number!"})
        }
       if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match!" });
          }
              if (!req.file) {
      return res.status(400).json({ message: "Profile image is required!" });
    }
        console.log("File",req.file);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: process.env.CLOUDINARY_PROFILE_FOLDER},
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

        const register= new UserModel({ fullname,email,phone,password:hashPassword,profile:result.secure_url })
        await register.save()
        sendEmail(email,"Hello Welcome to our e-commerce website",`Hii,${fullname},Thank you for registered successfully with us`)
       res.status(201).json({message:"User Account created successfully!",data:register})
    } catch (error) {
         console.error(error);
    return res.status(500).json({ error: "Account creation failed!" });

    }
}

const loginWithOtp= async(req,res)=>{
    const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

    try {
        const {email}= req.body
        if(!email){
              if (!email) return res.status(400).json({ message: "Email is required!" });  
        }
        const findUser= await UserModel.findOne({email})
        if(!findUser){
            return res.status(404).json({ message: "User not found!" });
        }
        const otpGenerate= generateOTP();
        const expiry= new Date(Date.now()+10*60*1000)
        findUser.otp=otpGenerate,
        findUser.otpExpiry=expiry
        await findUser.save()

        const html=`
        <h3>Hello, ${findUser.fullname},</h3>
         <p>Your OTP for login is:</p>
      <h1 style="color: #0d6efd">${otpGenerate}</h1>
      <p>This OTP will expire in 10 minutes.</p>
        `;
        await sendEmail(findUser.email,"Your Login OTP",`Your OTP is:${otpGenerate}`,html)
            return res.status(200).json({ message: "OTP sent to email."});

    } catch (error) {
            console.error(err);
    return res.status(500).json({ error: "OTP request failed!" });
  
    }
}

const verifyOTPLogin = async (req, res) => {
  try {
    const {email,otp } = req.body

    if (!otp) {
      return res.status(400).json({ message: "OTP is required!" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    // Check OTP and expiry
    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP!" });
    }

    // Clear OTP after successful login
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.secret_key,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ message: "Login successful!", token, Data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "OTP verification failed!" });
  }
};

const loginUser= async (req,res)=>{
    try {
        const {email,password}= req.body;
        if(!email || !password){
            return res.status(401).json({message:"All fields are required!"})
        }
        const findUser= await UserModel.findOne({email})
        if(!findUser){
            return res.status(404).json({message:"User doesn't exist!"})
        }
        const isCompare = await bcrypt.compare(password,findUser.password)
        if(!isCompare){
         return res.status(409).json({message:"Password doesn't match!"})
        }
        const token = jwt.sign({id:findUser._id,email:findUser.email},process.env.secret_key,{expiresIn:'1d'});
        return res.status(201).json({message:"User login successfully!",token,Data:findUser})
    } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Account creation failed!" });

    }
}


module.exports={createAccount,loginUser,loginWithOtp,verifyOTPLogin}