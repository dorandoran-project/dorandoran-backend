const createError = require("http-errors");
const communityService = require("../services/communityService");
const roomService = require("../services/roomService");
const constants = require("../utils/constants");

exports.init = async (req, res, next) => {
  try {
    const allRooms = await roomService.getRooms();
    const rooms = roomService.getInitRooms(allRooms);

    res.json({ rooms });
  } catch (error) {
    next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }
};

exports.getRooms = async (req, res, next) => {
  try {
    const roomTotalData = await roomService.getRooms();
    const lastRoom = req.body.lastRoom;
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

    const newRoom = await roomService.createRoom(roomData, roomNumber);

    await communityService.addCommunityRoom(newRoom);

    res.status(200).json({ newRoom });
  } catch (error) {
    next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }
};

exports.countUsers = async (req, res, next) => {
  try {
    const roomId = req.body.roomId;

    console.log(roomId);

    const userCount = await roomService.getCountUser(roomId);

    console.log("userCount", userCount);

    res.json({ userCount });
  } catch (error) {
    next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }
};

exports.joinedUser = async (req, res, next) => {
  try {
    const currentRoom = req.body.currentRoom;
    const currentUser = req.body.currentUser;

    await roomService.getCurrentRoom(currentRoom, currentUser);

    res.status(200).json({ success: constants.SUCCESS });
  } catch (error) {
    next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const currentRoom = req.body.currentRoom;
    const currentUser = req.body.currentUser;

    await roomService.deleteUserInfo(currentRoom, currentUser);

    res.status(200).json({ success: constants.SUCCESS });
  } catch (error) {
    next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }
};

exports.getCurrentRoom = async (req, res, next) => {
  try {
    const roomId = req.body.roomId;
    const room = await roomService.getUsers(roomId);

    res.status(200).json({ room });
  } catch (error) {
    next(createError(400, { message: constants.ERROR_BAD_REQUEST }));
  }
};
