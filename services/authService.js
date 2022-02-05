const User = require("../models/User");

exports.getUser = async (email, refreshToken) => {
  const user = await User.findOne({ email });
  user.refresh_token = refreshToken;
  await user.save();

  return user;
};
