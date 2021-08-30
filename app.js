const express = require("express");
const app = express();

const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/products");

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

app.use("/test/", (req, res, next) => {
  res.status(200).send({
    message: "Server OK",
  });
});

module.exports = app;
