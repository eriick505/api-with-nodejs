const express = require("express");
const router = express.Router();

const signUpController = require("../controllers/users/signup");
const loginController = require("../controllers/users/login");

router.post("/signup", signUpController);
router.post("/login", loginController);

module.exports = router;
