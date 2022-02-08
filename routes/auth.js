const express = require("express");
const router = express.Router();
const authController = require("../contorollers/authController");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/isLogged");
const { validateKakaoLogin } = require("../middlewares/validate");

router.get("/", authController.getUserInformation);

router.post("/login", validateKakaoLogin, isLoggedIn, authController.login);

router.get("/logout", isNotLoggedIn, authController.logout);

module.exports = router;
