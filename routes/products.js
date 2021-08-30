const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

// GET ALL PRODUTS
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error });

    conn.query("SELECT * FROM produtos", (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      return res.status(200).send({ results });
    });
  });
});

// INSERT PRODUCT
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error });

    conn.query(
      "INSERT INTO produtos (name, price) VALUES (?, ?)",
      [req.body.name, req.body.price],
      (error, results, field) => {
        conn.release();

        if (error) return res.status(500).send({ error, response: null });

        res.status(201).send({
          message: "Successfully created product",
          id_product: results.insertId,
        });
      }
    );
  });
});

// GET PRODUCT
router.get("/:product_id", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error });

    conn.query(
      "SELECT * FROM produtos WHERE id_product = ?",
      [req.params.product_id],
      (error, results, field) => {
        conn.release();

        if (error) return res.status(500).send({ error, response: null });

        return res.status(200).send({ results });
      }
    );
  });
});

// UPDATE PRODUCT
router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error });

    conn.query(
      `UPDATE produtos
          SET name       = ?,
              price      = ?
        WHERE id_product = ?`,
      [req.body.name, req.body.price, req.body.id_product],
      (error, results, field) => {
        conn.release();

        if (error) return res.status(500).send({ error, response: null });

        res.status(202).send({
          message: "Successfully update product",
        });
      }
    );
  });
});

// DELETE PRODUCT
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error });

    conn.query(
      "DELETE FROM produtos WHERE id_product = ?",
      [req.body.id_product],
      (error, results, field) => {
        conn.release();

        if (error) return res.status(500).send({ error, response: null });

        res.status(202).send({
          message: "Successfully deleted product",
        });
      }
    );
  });
});

module.exports = router;
