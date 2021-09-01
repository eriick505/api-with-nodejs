const mysql = require("../../mysql").pool;

const getAllOrders = (req, res, next) => {
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
};

module.exports = getAllOrders;
