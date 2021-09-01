const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const multer = require("multer");
const login = require("../middleware/login");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    const data = new Date().toISOString().replace(/:/g, "-") + "-";
    callback(null, data + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

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
          image_product: product.image_product,
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
router.post(
  "/",
  login.required,
  upload.single("product_image"),
  (req, res, next) => {
    console.log(req.user);

    mysql.getConnection((error, conn) => {
      const query =
        "INSERT INTO products (name, price, image_product) VALUES (?, ?, ?)";
      const values = [req.body.name, req.body.price, req.file.path];

      if (error) return res.status(500).send({ error });

      conn.query(query, values, (error, results, field) => {
        conn.release();

        if (error) return res.status(500).send({ error, response: null });

        const response = {
          message: "Successfully created product",
          product: {
            id_product: results.insertId,
            name: req.body.name,
            price: req.body.price,
            image_product: req.file.path,
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
  }
);

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
          image_product: results[0].image_product,
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
router.patch("/", login.required, (req, res, next) => {
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
router.delete("/", login.required, (req, res, next) => {
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
