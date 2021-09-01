const mysql = require("../../mysql").pool;

const postProduct = (req, res, next) => {
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
};

module.exports = postProduct;
