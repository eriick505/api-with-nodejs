const mysql = require("../../mysql").pool;

const updateProduct = (req, res, next) => {
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
};

module.exports = updateProduct;
