const jwt = require("jsonwebtoken");
const authService = require("../services/authService");
const roomService = require("../services/roomService");
const communityService = require("../services/communityService");
const constants = require("../utils/constants");
const User = require("../models/User");
const { use } = require("../routes/auth");
exports.login = async (req, res) => {
  const { name, email, profile, age_range, gender } = req.body;

  if (!email) {
    return res.send("이메일 항목에 동의해주세요"); //다시 동의할 수 있게 카카오로그인창 떠야할듯
  }

  const access_token = jwt.sign({ email: email }, process.env.COOKIE_SECRET, {
    expiresIn: "1h", //토큰 만료 시간
  });

  const refresh_token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  const user = await authService.getUser(req, res);
  if (!user) {
    return await User.create({
      name,
      email,
      profile,
      age_range,
      gender,
      refresh_token: refresh_token,
    });
  }

  user.refresh_token = refresh_token;
  await user.save();
  res.cookie("access_token", access_token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json(user);
};

exports.refresh = async (req, res) => {};

exports.logout = async (req, res, next) => {};
