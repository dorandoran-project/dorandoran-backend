const User = require("../models/User");

exports.getUser = async () => {
  return await User.find({}).exec();
};
