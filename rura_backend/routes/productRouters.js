const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Fetch all products
router.get("/", async (req, res) => {
  try {
    // console.log("hi")
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

module.exports = router;
