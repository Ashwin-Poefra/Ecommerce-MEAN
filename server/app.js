const express = require("express");
const app = express();

require("dotenv/config");
const api = process.env.API_URL;

app.get("/", (req, res) => {
  console.log(api);
  res.send("Hello API!!!");
});

app.listen(3000, () => {});
