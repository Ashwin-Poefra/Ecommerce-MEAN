const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");
const api = process.env.API_URL;
const connectionString = process.env.CONNECTION_STRING;

//Middleware
app.use(express.json());
app.use(morgan("tiny"));

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

app.get(`${api}/products`, async (req, res) => {
  const productList = await Product.find();

  if(!productList){
    res.status(500).json({
        success: false,
      });
  }
  res.send(productList);
});

app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        success: false,
      });
    });
});

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database is ready ...");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {});
