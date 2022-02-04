const express = require("express");
const router = express.Router();
const authController = require("../contorollers/authController");
const constants = require("../utils/constants");

router.get("/login", authController.login);

router.get("/logout", authController.logout);

module.exports = router;
