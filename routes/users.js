const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
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
});

router.post("/login", (req, res, next) => {
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
});

module.exports = router;
