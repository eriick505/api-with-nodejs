const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

// GET ALL PRODUTS
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query = "SELECT * FROM produtos";

    if (error) return res.status(500).send({ error });

    conn.query(query, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      return res.status(200).send({ results });
    });
  });
});

// INSERT PRODUCT
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query = "INSERT INTO produtos (name, price) VALUES (?, ?)";
    const values = [req.body.name, req.body.price];

    if (error) return res.status(500).send({ error });

    conn.query(query, values, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      res.status(201).send({
        message: "Successfully created product",
        id_product: results.insertId,
      });
    });
  });
});

// GET PRODUCT
router.get("/:product_id", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query = "SELECT * FROM produtos WHERE id_product = ?";
    const value = [req.params.product_id];

    if (error) return res.status(500).send({ error });

    conn.query(query, value, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      return res.status(200).send({ results });
    });
  });
});

// UPDATE PRODUCT
router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query =
      "UPDATE produtos SET name = ?, price = ? WHERE id_product = ?";
    const values = [req.body.name, req.body.price, req.body.id_product];

    if (error) return res.status(500).send({ error });

    conn.query(query, values, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      res.status(202).send({
        message: "Successfully update product",
      });
    });
  });
});

// DELETE PRODUCT
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query = "DELETE FROM produtos WHERE id_product = ?";
    const value = [req.body.id_product];

    if (error) return res.status(500).send({ error });

    conn.query(query, value, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      res.status(202).send({
        message: "Successfully deleted product",
      });
    });
  });
});

module.exports = router;
