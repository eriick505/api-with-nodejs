const mysql = require("../../mysql").pool;

const getOrder = (req, res, next) => {
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
};

module.exports = getOrder;
