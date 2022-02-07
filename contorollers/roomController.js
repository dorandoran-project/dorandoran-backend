const roomService = require("../services/roomService");
const communityService = require("../services/communityService");
const constants = require("../utils/constants");
const createError = require("http-errors");

exports.getRooms = (req, res) => {
  // const rooms = await roomService.getRooms();
  // res.json({ rooms });
  res.json({ success: "room data" });
};

exports.createRoom = async (req, res, next) => {
  try {
    const roomData = req.body.roomData;

    const roomNumber = await communityService.getLocationRoomCount(
      roomData.roomCreator.current_address
    );

    const newRoom = await roomService.createRoom(roomData, roomNumber);

    await communityService.addCommunityRoom(newRoom);

    res.json({ success: constants.SUCCESS });
  } catch (error) {
    next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }
};
