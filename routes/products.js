const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

// GET ALL PRODUTS
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query = "SELECT * FROM products";

    if (error) return res.status(500).send({ error });

    conn.query(query, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      const response = {
        quantity: results.length,
        products: results.map((product) => ({
          id_product: product.id_product,
          name: product.name,
          price: product.price,
          request: {
            type: "GET",
            description: "Get product details",
            url: `http://localhost:3000/products/${product.id_product}`,
          },
        })),
      };

      return res.status(200).send(response);
    });
  });
});

// INSERT PRODUCT
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query = "INSERT INTO products (name, price) VALUES (?, ?)";
    const values = [req.body.name, req.body.price];

    if (error) return res.status(500).send({ error });

    conn.query(query, values, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      const response = {
        message: "Successfully created product",
        product: {
          id_product: results.id_product,
          name: results.name,
          price: results.price,
          request: {
            type: "GET",
            description: "Return all Products",
            url: `http://localhost:3000/products`,
          },
        },
      };

      res.status(201).send(response);
    });
  });
});

// GET PRODUCT
router.get("/:product_id", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query = "SELECT * FROM products WHERE id_product = ?";
    const value = [req.params.product_id];

    if (error) return res.status(500).send({ error });

    conn.query(query, value, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      if (results.length === 0)
        return res.status(404).send({ message: "Product Not Found" });

      const response = {
        product: {
          id_product: results[0].id_product,
          name: results[0].name,
          price: results[0].price,
          request: {
            type: "GET",
            description: "Return all Products",
            url: `http://localhost:3000/products`,
          },
        },
      };

      return res.status(200).send(response);
    });
  });
});

// UPDATE PRODUCT
router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query =
      "UPDATE products SET name = ?, price = ? WHERE id_product = ?";
    const values = [req.body.name, req.body.price, req.body.id_product];

    if (error) return res.status(500).send({ error });

    conn.query(query, values, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      const response = {
        message: "Successfully update product",
        product: {
          id_product: req.body.id_product,
          name: req.body.name,
          price: req.body.price,
          request: {
            type: "GET",
            description: "Get product details",
            url: `http://localhost:3000/products/${req.body.id_product}`,
          },
        },
      };

      res.status(202).send(response);
    });
  });
});

// DELETE PRODUCT
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query = "DELETE FROM products WHERE id_product = ?";
    const value = [req.body.id_product];

    if (error) return res.status(500).send({ error });

    conn.query(query, value, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      const response = {
        message: "Successfully deleted product",
        request: {
          type: "POST",
          description: "Create new Product",
          url: `http://localhost:3000/products`,
          bodyRequest: {
            name: "String",
            price: "Number",
          },
        },
      };

      res.status(202).send(response);
    });
  });
});

module.exports = router;
