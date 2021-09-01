const mysql = require("../../mysql").pool;

const postOrder = (req, res, next) => {
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
};

module.exports = postOrder;
