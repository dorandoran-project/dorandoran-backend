const express = require("express");
const router = express.Router();
const authController = require("../contorollers/authController");
// const constants = require("../utils/constants");

router.post("/login", authController.login);

router.post("/refresh", authController.refresh);
router.get("/logout", authController.logout);

module.exports = router;
