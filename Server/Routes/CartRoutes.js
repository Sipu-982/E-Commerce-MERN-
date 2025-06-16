const express = require("express");
const { addToCart, getCart, removeFromCart } = require("../Controllers/CartController");
const authenticateSeller = require("../Middleware/AuthMidlleware");
// const verifyToken = require("../Middlewares/verifyToken");

const router = express.Router();

router.post("/add", authenticateSeller, addToCart);
router.get("/getCart", authenticateSeller, getCart);
router.delete("/remove/:productId", authenticateSeller, removeFromCart);

module.exports = router;
