const Room = require("../models/Room");

exports.getRooms = async (req, res, next) => {
  return await Room.find();
};
