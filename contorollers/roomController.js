const authService = require("../services/authService");
const roomService = require("../services/roomService");
const communityService = require("../services/communityService");
const constants = require("../utils/constants");

exports.getRooms = async (req, res, next) => {
  // const rooms = await roomService.getRooms();
  // res.json({ rooms });
  res.json({ success: "room datas" });
};

exports.createRoom = async (req, res, next) => {};

exports.getRoom = async (req, res, next) => {};
