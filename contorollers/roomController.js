const roomService = require("../services/roomService");

exports.getRooms = async (req, res, next) => {
  // const rooms = await roomService.getRooms();
  // res.json({ rooms });
  res.json({ success: "room data" });
};

exports.createRoom = async (req, res, next) => {};

exports.getRoom = async (req, res, next) => {};
