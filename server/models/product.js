const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const { Category } = require("./category");

const productSchema = mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  countInStock: {
    type: Number,
    required: "",
    min: 0,
    max: 255,
  },
  rating: {
    type: Number,
    required: "",
    min: 1,
    max: 5,
  },
  isFeatured: {
    type: Date,
    default: false,
  },
  createdDate: {
    type: Date,
  },
});

exports.Product = mongoose.model("Product", productSchema);
