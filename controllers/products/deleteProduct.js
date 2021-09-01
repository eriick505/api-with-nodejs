const mysql = require("../../mysql").pool;

const deleteProduct = (req, res, next) => {
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
};

module.exports = deleteProduct;
