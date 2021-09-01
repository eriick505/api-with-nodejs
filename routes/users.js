const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error: error });

    bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
      if (errBcrypt) return res.status(500).send({ error: errBcrypt });

      const query =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      const values = [req.body.name, req.body.email, hash];

      conn.query(query, values, (error, results) => {
        conn.release();

        if (errBcrypt) return res.status(500).send({ error: errBcrypt });

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

module.exports = router;
