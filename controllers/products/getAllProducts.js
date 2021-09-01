const mysql = require("../../mysql").pool;

const getAllProducts = (req, res, next) => {
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
};

module.exports = getAllProducts;
