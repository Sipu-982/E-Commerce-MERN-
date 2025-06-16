const UserModel = require("../Models/UserModel");
const ProductModel = require("../Models/AddProduct");

// Add to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // From middleware
    const { productId, quantity } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingItem = user.cart.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).populate('cart.productId');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// Remove item
const removeFromCart = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    user.cart = user.cart.filter(item => !item.productId.equals(req.params.productId));
    await user.save();
    res.status(200).json({ message: "Item removed", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
