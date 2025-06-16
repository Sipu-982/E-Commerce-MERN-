const express= require('express')
const { createAccount, loginUser, loginWithOtp, verifyOTPLogin } = require('../Controllers/AuthController')
const router= express.Router()
const multer= require('multer')
const storage= multer.memoryStorage()
const upload= multer({storage})

router.post('/createAccount',upload.single("image"),createAccount)
router.post('/loginUser',loginUser)
router.post('/loginWithOtp', loginWithOtp);   
router.post('/verifyOtpLogin', verifyOTPLogin);
module.exports= router;