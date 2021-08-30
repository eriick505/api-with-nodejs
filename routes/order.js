const express = require("express");
const router = express.Router();

// GET ALL ORDERS
router.get("/", (req, res, next) => {
  res.status(200).send({
    message: "GET: Get all orders",
  });
});

// INSERT ORDER
router.post("/", (req, res, next) => {
  res.status(201).send({
    message: "POST: Create new order",
  });
});

// GET ORDER
router.get("/:order_id", (req, res, next) => {
  const id = req.params.order_id;

  res.status(201).send({
    message: "GET: Get order",
    id,
  });
});

// DELETE ORDER
router.delete("/", (req, res, next) => {
  res.status(201).send({
    message: "DELETE: Delete order",
  });
});

module.exports = router;
