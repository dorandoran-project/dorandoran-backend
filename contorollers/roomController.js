const createError = require("http-errors");
const roomService = require("../services/roomService");
const constants = require("../utils/constants");
const communityService = require("../services/communityService");

exports.init = async (req, res, next) => {
  try {
    const allRooms = await roomService.getRooms();
    const rooms = await roomService.getInitRooms(allRooms);

    res.json({ rooms });
  } catch (error) {
    next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }
};

exports.getRooms = async (req, res, next) => {
  try {
    const roomTotalData = await roomService.getRooms();
    const lastRoom = req.body.room;
    const direction = req.body.direction;
    const index = roomService.getIndex(lastRoom._id, roomTotalData);
    const rooms = roomService.findOnePageRooms(roomTotalData, direction, index);

    res.json({ rooms });
  } catch (error) {
    next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }
};

exports.reload = async (req, res, next) => {
  try {
    let rooms = req.body.roomList;
    rooms = await roomService.getUpdateRooms(rooms);

    res.json({ rooms });
  } catch (error) {
    next(createError(401, { message: constants.ERROR_UNAUTHORIZE }));
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const roomData = req.body.roomData;

    const roomNumber = await communityService.getLocationRoomCount(
      roomData.roomCreator.current_address
    );

    console.log("룸번호::::::", roomNumber);

    const newRoom = await roomService.createRoom(roomData, roomNumber);

    await communityService.addCommunityRoom(newRoom);

    res.json({ success: constants.SUCCESS });
  } catch (error) {
    next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }
};
