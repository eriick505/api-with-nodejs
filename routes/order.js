const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

// GET ALL ORDERS
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query = `SELECT orders.id_order,
                          orders.quantity, 
                          products.id_product,
                          products.name,
                          products.price  
                      FROM orders
                INNER JOIN products
                        ON products.id_product = orders.id_product;`;

    if (error) return res.status(500).send({ error });

    conn.query(query, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      const response = {
        quantityOrders: results.length,
        orders: results.map((order) => ({
          id_order: order.id_order,
          quantity: order.quantity,
          product: {
            id_product: order.id_product,
            name: order.name,
            order: order.price,
          },
          request: {
            type: "GET",
            description: "Get order details",
            url: `http://localhost:3000/orders/${order.id_order}`,
          },
        })),
      };

      return res.status(200).send(response);
    });
  });
});

// INSERT ORDER
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error });

    const productQuery = "SELECT * FROM products WHERE id_product = ?";
    const productvalue = [req.body.id_product];

    conn.query(productQuery, productvalue, (error, results, field) => {
      if (error) return res.status(500).send({ error, response: null });

      if (results.length === 0)
        return res.status(404).send({ message: "Product Not Found" });

      const orderQuery =
        "INSERT INTO orders (id_product, quantity) VALUES (?, ?)";
      const orderValues = [req.body.id_product, req.body.quantity];

      if (error) return res.status(500).send({ error });

      conn.query(orderQuery, orderValues, (error, results, field) => {
        conn.release();

        if (error) return res.status(500).send({ error, response: null });

        const response = {
          message: "Successfully created order",
          order: {
            id_order: results.insertId,
            id_product: req.body.id_product,
            quantity: req.body.quantity,
            request: {
              type: "GET",
              description: "Return all orders",
              url: `http://localhost:3000/orders`,
            },
          },
        };

        res.status(201).send(response);
      });
    });
  });
});

// GET ORDER
router.get("/:id_order", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query = "SELECT * FROM orders WHERE id_order = ?";
    const value = [req.params.id_order];

    if (error) return res.status(500).send({ error });

    conn.query(query, value, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      if (results.length === 0)
        return res.status(404).send({ message: "Order Not Found" });

      const response = {
        order: {
          id_order: results[0].id_order,
          id_product: results[0].id_product,
          quantity: results[0].quantity,
          request: {
            type: "GET",
            description: "Return all Orders",
            url: `http://localhost:3000/order`,
          },
        },
      };

      return res.status(200).send(response);
    });
  });
});

// DELETE ORDER
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    const query = "DELETE FROM orders WHERE id_order = ?";
    const value = [req.body.id_order];

    if (error) return res.status(500).send({ error });

    conn.query(query, value, (error, results, field) => {
      conn.release();

      if (error) return res.status(500).send({ error, response: null });

      const response = {
        message: "Successfully deleted order",
        request: {
          type: "POST",
          description: "Create new Order",
          url: `http://localhost:3000/orders`,
          bodyRequest: {
            id_product: "Number",
            quantity: "Number",
          },
        },
      };

      res.status(202).send(response);
    });
  });
});

module.exports = router;
