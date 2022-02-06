const express = require("express");
const router = express.Router();
const authController = require("../contorollers/authController");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/isLogged");

router.post("/login", isLoggedIn, authController.login);

router.get("/logout", isNotLoggedIn, authController.logout);

module.exports = router;
