const jwt = require("jsonwebtoken");
const authService = require("../services/authService");
const roomService = require("../services/roomService");
const communityService = require("../services/communityService");
const constants = require("../utils/constants");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { name, email, profile, age_range, gender } = req.body;

  if (!email) {
    return res.json("이메일 항목에 동의해주세요"); //테스트 중입니다
  }

  const accessToken = jwt.sign({ email: email }, process.env.COOKIE_SECRET, {
    expiresIn: "1h", //토큰 만료 시간
  });

  const refreshToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  const user = await authService.getUser(email, refreshToken);
  if (!user) {
    await User.create({
      name,
      email,
      profile,
      age_range,
      gender,
      refresh_token: refreshToken,
    });
  }

  res.status(200).json(user);
};

exports.refresh = async (req, res) => {};

exports.logout = async (req, res, next) => {};
