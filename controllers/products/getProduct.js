const mysql = require("../../mysql").pool;

const getProduct = (req, res, next) => {
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
};

module.exports = getProduct;
