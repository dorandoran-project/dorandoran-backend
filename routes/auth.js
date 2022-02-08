const express = require("express");
const router = express.Router();
const authController = require("../contorollers/authController");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/isLogged");
const { kakaoLogin } = require("../middlewares/validate");

router.post("/login", kakaoLogin, isLoggedIn, authController.login);

router.get("/logout", isNotLoggedIn, authController.logout);

module.exports = router;
