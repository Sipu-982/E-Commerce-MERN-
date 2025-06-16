const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    required: true
  },
  otp:{
    type:String,
    // required:true
  },
  otpExpiry:{
    type:Date,
    // required:
  },
  cart: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1
    }
  }
]

}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
