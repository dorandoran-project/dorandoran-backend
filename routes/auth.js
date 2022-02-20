const express = require("express");
const router = express.Router();
const authController = require("../contorollers/authController");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/isLogged");
const { validateKakaoLogin } = require("../middlewares/validate");
const authorization = require("../middlewares/authorization");

router.get("/", authController.clear);

router.post("/login", validateKakaoLogin, isLoggedIn, authController.login);

router.get("/logout", isNotLoggedIn, authorization, authController.clear);

module.exports = router;
