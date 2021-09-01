const mysql = require("../../mysql").pool;
const bcrypt = require("bcrypt");

const signup = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error });

    const querySelect = "SELECT * FROM users WHERE email = ?";
    const valueSelect = [req.body.email];

    conn.query(querySelect, valueSelect, (error, results) => {
      if (error) return res.status(500).send({ error });

      if (results.length > 0) {
        return res.status(409).send({ message: "Already registered user" });
      }

      bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
        if (errBcrypt) return res.status(500).send({ error: errBcrypt });

        const queryInsert =
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        const valuesInsert = [req.body.name, req.body.email, hash];

        conn.query(queryInsert, valuesInsert, (error, results) => {
          conn.release();

          if (error) return res.status(500).send({ error });

          const response = {
            message: "Successfully created user",
            userCreated: {
              id_user: results.insertId,
              name: req.body.name,
              email: req.body.email,
            },
          };

          return res.status(201).send(response);
        });
      });
    });
  });
};

module.exports = signup;
