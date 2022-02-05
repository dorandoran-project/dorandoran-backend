const User = require("../models/User");

exports.getUser = async (req, res) => {
  const { email } = req.body;
  return await User.findOne({ email });

  // return await User.find({}).exec();
};
