const roomService = require("../services/roomService");

exports.getRooms = async (req, res, next) => {
  try {
    let lastRoom = req.body.room;
    const direction = req.body.direction;
    const roomTotalData = await roomService.getRooms();
    const index = roomService.getIndex(lastRoom._id, roomTotalData);

    const rooms = roomService.findOnePageRooms(roomTotalData, direction, index);

    res.json({ rooms });
  } catch (error) {
    console.log("server error", error);
  }
};

exports.init = async (req, res) => {
  try {
    const allRooms = await roomService.getRooms();
    const rooms = await roomService.getInitRooms(allRooms);

    res.json({ rooms });
  } catch (error) {
    console.log("server error", error);
  }
};

exports.reload = async (req, res) => {
  try {
    let rooms = req.body.roomList;
    rooms = await roomService.getUpdateRooms(rooms);

    res.json({ rooms });
  } catch (error) {
    console.log("server error", error);
  }
};

exports.createRoom = async (req, res, next) => {};
