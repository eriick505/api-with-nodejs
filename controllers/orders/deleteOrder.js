const mysql = require("../../mysql").pool;

const deleteOrder = (req, res, next) => {
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
};

module.exports = deleteOrder;
