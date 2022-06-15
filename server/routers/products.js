const { Product } = require("../models/product");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(productList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');

  if (!product) {
    res.status(404).json({
      success: false,
      message: "can not found product with provided id: " + req.params.id,
    });
  }
  res.status(200).send(product);
});

router.post(`/`, async (req, res) => {
  const category =  await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("The Category cannot be found");
  }
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    longDescription: req.body.longDescription,
    image: req.body.image,
    images: req.body.images,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    createdDate: req.body.createdDate,
  });

  product = await product.save();
  if (!product) {
    return res.status(400).send("The product cannot be created");
  }

  res.send(product);
});

module.exports = router;
