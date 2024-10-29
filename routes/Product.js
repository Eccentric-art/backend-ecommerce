const express = require("express");
const { createProduct, getAllProduct, getSinleProduct, updateProducts,  } = require("../Controller/Product");
const Product = require("../Schema/Product");


const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProduct);
router.get("/:id", getSinleProduct);
router.put("/:id", updateProducts);
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
        products,
    })
  } catch (error) {
    res.status(401).json({
        message: "failed",
        error,
      });
  }
});

module.exports = router;
