const express = require("express");
const router = express.Router();

// GET ALL PRODUTS
router.get("/", (req, res, next) => {
  res.status(200).send({
    message: "GET: Get all products",
  });
});

// INSERT PRODUCT
router.post("/", (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
  };

  res.status(201).send({
    message: "POST: Create new product",
    newProduct: product,
  });
});

// GET PRODUCT
router.get("/:product_id", (req, res, next) => {
  const id = req.params.product_id;

  res.status(201).send({
    message: "GET: Get product",
    id,
  });
});

// UPDATE PRODUCT
router.patch("/", (req, res, next) => {
  res.status(201).send({
    message: "PATCH: Update product",
  });
});

// DELETE PRODUCT
router.delete("/", (req, res, next) => {
  res.status(201).send({
    message: "DELETE: Delete product",
  });
});

module.exports = router;
