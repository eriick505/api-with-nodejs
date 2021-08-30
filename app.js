const express = require("express");
const app = express();
const morgan = require("morgan");

const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/order");

app.use(morgan("dev"));

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

// Access here when not routes are found
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
