const authService = require("../services/authService");
const roomService = require("../services/roomService");
const communityService = require("../services/communityService");
const constants = require("../utils/constants");

exports.login = async (req, res) => {
  const users = await authService.getUser();
  res.json({ users });
};

exports.logout = async (req, res, next) => { };
