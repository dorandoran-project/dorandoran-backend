const User = require("../models/User");

exports.getUser = async (email) => {
  return await User.findOne({ email });
};

exports.createUser = async (userInfo, refreshToken) => {
  return await User.create({
    name: userInfo.name,
    email: userInfo.email,
    profile: userInfo.profile,
    age_range: userInfo.age_range,
    gender: userInfo.gender,
    refresh_token: refreshToken,
  });
};

exports.saveRefreshToken = async (user, refreshToken) => {
  user.refresh_token = refreshToken;
  await user.save();
};
