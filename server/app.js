const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");
const api = process.env.API_URL;
const connectionString = process.env.CONNECTION_STRING;

const categoriesRouter = require("./routers/categories");
const productsRouter = require("./routers/products");
const usersRouter = require("./routers/users");
const ordersRouter = require("./routers/orders");

//Middleware
app.use(express.json());

//Logs
app.use(morgan("tiny"));

//Routers
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);


mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connection is ready ...");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {});
