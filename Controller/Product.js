const asyncHandler = require("express-async-handler");
const Product = require("../Schema/Product");
const cloudinary = require("../services/Cloudinary");
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    discountPrice,
    contactNumber,
    quantity,
    variety,
    category,
    brand,
    img,
  } = req.body;
  try {
    const productExists = await Product.findOne({ name });
    if (productExists) {
      res.status(709).json({
        message: "product already exists",
      });
    }
    const uploadedImages = await Promise.all(
      img.map(async (image) => {
        const result = await cloudinary.uploader.upload(image, {
          folder: "products", // Optional: store images in a specific folder in Cloudinary
          resource_type: "image",
          fileNmane: `${req.body.name}.jpg`,
        });

        return {
          url: result.secure_url,
        };
      })
    );

    const newProducts = await Product.create({
      name,
      price,
      description,
      discountPrice,
      contactNumber,
      quantity,
      variety,
      category,
      brand,
      img: uploadedImages,
    });
    res.status(200).json({
      _id: newProducts._id,
      name: newProducts.name,
      price: newProducts.price,
      img: newProducts.img,
      description: newProducts.description,
      discountPrice: newProducts.discountPrice,
      contactNumber: newProducts.contactNumber,
      quantity: newProducts.quantity,
      variety: newProducts.variety,
      category: newProducts.category,
      brand: newProducts.brand,
      message: "successful",
    });
  } catch (error) {
    res.status(401).json({
      message: "error encountered",
      error,
    });
  }
});
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      products,
    });
  } catch (error) {
    res.status(401).json({
      message: "error",
    });
  }
});
const getSinleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.findOne({ id });
    res.status(200).json({
      message: "successful",
      products,
    });
  } catch (error) {
    res.status(401).json({
      message: "error",
    });
  }
});
const updateProducts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    discountPrice,
    contactNumber,
    quantity,
    variety,
    category,
    brand,
    comment,
    rating,
    img,
  } = req.body;
  try {
    const updateProduct = await Product.findById(id);

    if (!updateProduct) {
      res.status(809).json({
        message: "content not found",
      });
    }
    // const uploadedImages = await Promise.all(
    //   img.map(async (image) => {
    //     const result = await cloudinary.uploader.upload(image, {
    //       folder: "products", // Optional: store images in a specific folder in Cloudinary
    //       resource_type: "image",
    //       fileNmane: `${req.body.name}.jpg`,
    //     });

    //     return {
    //       url: result.secure_url,
    //     };
    //   })
    // );
    updateProduct.name = name || updateProduct.name;
    updateProduct.description = description || updateProduct.description;
    updateProduct.price = price || updateProduct.price;
    updateProduct.discountPrice = discountPrice || updateProduct.discountPrice;
    updateProduct.contactNumber = contactNumber || updateProduct.contactNumber;
    updateProduct.quantity = quantity || updateProduct.quantity;
    updateProduct.variety = variety || updateProduct.variety;
    updateProduct.category = category || updateProduct.category;
    updateProduct.brand = brand || updateProduct.brand;
    updateProduct.comment = comment || updateProduct.comment;
    updateProduct.rating = rating || updateProduct.rating;
    // updateProduct.img = uploadedImages || updateProduct.img;
    await updateProduct.save();
    res.status(200).json({
      message: "Update successfull",
      updateProduct,
    });
  } catch (error) {
    res.status(690).json({
      message: "Update not succesfull",
    });
  }
});
module.exports = {
  createProduct,
  getAllProduct,
  getSinleProduct,
  updateProducts,
};
