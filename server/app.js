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

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: "hair dresser",
    image: "some_url",
  };
  res.send(product);
});

app.post(`${api}/products`, (req, res) => {
  const product = req.body;
  res.send(product);
});

mongoose.connect(connectionString).then(() => {
  console.log("Database is ready ...");
}).catch((error)=>{
    console.log(error);
});

app.listen(3000, () => {});
