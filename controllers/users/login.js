const mysql = require("../../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error });

    const query = "SELECT * FROM users WHERE email = ?";
    const values = [req.body.email];

    conn.query(query, values, (error, queryResults, fields) => {
      conn.release();

      if (error) return res.status(500).send({ error });

      if (queryResults.length < 1)
        return res.status(401).send({ message: "Couldn't find your Account" });

      bcrypt.compare(
        req.body.password,
        queryResults[0].password,
        (error, bcryptResult) => {
          if (error)
            return res
              .status(401)
              .send({ message: "Couldn't find your Account" });

          if (!bcryptResult)
            return res
              .status(401)
              .send({ message: "Email or password invalid" });

          const token = jwt.sign(
            {
              id_user: queryResults[0].id_user,
              name: queryResults[0].name,
              email: queryResults[0].email,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );

          return res
            .status(200)
            .send({ message: "Successfully logged in", token });
        }
      );
    });
  });
};

module.exports = login;
