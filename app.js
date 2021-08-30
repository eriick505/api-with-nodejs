const express = require("express");
const app = express();
const morgan = require("morgan");

const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/order");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); // only simple data
app.use(express.json()); // only json data

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    req.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }

  next();
});

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
