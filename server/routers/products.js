const { Product } = require("../models/product");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },

  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(productList);
});

router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const productList = await Product.find({ isFeatured: true }).limit(+count);

  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(productList);
});

router.get(`/get/category/:id`, async (req, res) => {
  const params = req.params.id;

  const category = await Category.findById(params);
  if (!category) {
    return res.status(400).send("The Category cannot be found");
  }

  const productList = await Product.find({ category: category }).populate(
    "category"
  );

  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(productList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(404).json({
      success: false,
      message: "can not found product with provided id: " + req.params.id,
    });
  }
  res.status(200).send(product);
});

router.get(`/get/count`, async (req, res) => {
  const product = await Product.countDocuments();

  if (!product) {
    res.status(404).json({
      success: false,
      message: "can not count products",
    });
  }
  res.status(200).send({
    productCount: product,
  });
});

router.post(`/`, uploadOptions.single("image"), async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("The Category cannot be found");
  }

  const file = req.file;
  if (!file) return res.status(400).send("no image file found!");

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  const fullImagePath = basePath + fileName;

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    longDescription: req.body.longDescription,
    image: fullImagePath,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();
  if (!product) {
    return res.status(400).send("The product cannot be created");
  }

  res.send(product);
});

router.put(`/:id`, uploadOptions.single("image"), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("invalid Product Id");
  }

  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("The Category cannot be found");
  }

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(400).send("Invalid Product!");

  const file = req.file;
  let fullImagePath;

  if (file) {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    fullImagePath = basePath + fileName;
  } else {
    fullImagePath = product.image;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      longDescription: req.body.longDescription,
      image: fullImagePath,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  );

  if (!updatedProduct) {
    res.status(400).json({
      success: false,
      message: "The product cannot be updated!",
    });
  }

  res.send(updatedProduct);
});

router.put(
  `/gallery-images/:id`,
  uploadOptions.array("images", 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).send("invalid Product Id");
    }
    const files = req.files;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    let imagesPaths = [];
    if (files) {
      files.map((file) => {
        const fileImagePath = basePath + file.filename;
        imagesPaths.push(basePath + fileImagePath);
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      {
        new: true,
      }
    );

    if (!product) {
      res.status(400).json({
        success: false,
        message: "The product cannot be updated!",
      });
    }

    res.send(product);
  }
);

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).json({
          success: true,
          message: "Product deleted successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "can not found product with provided id: " + req.params.id,
        });
      }
    })
    .catch((error) => {
      return res.status(404).json({
        success: false,
        message: "An Error Occurred: " + error,
      });
    });
});

module.exports = router;
