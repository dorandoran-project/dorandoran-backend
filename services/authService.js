const User = require("../models/User");

exports.getUser = async (email) => {
  return await User.findOne({ email });
};

exports.createUser = async (userInfo) => {
  return await User.create({
    name: userInfo.name,
    email: userInfo.email,
    profile: userInfo.profile,
    age_range: userInfo.age_range,
    gender: userInfo.gender,
    current_address: userInfo.current_address,
  });
};

exports.saveAddress = async (user, address) => {
  user.current_address = address;
  await user.save();
};
