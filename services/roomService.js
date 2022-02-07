const Room = require("../models/Room");

exports.getRooms = async () => {
  return await Room.find();
};

exports.createRoom = async (roomData, roomNumber) => {
  return await Room.create({
    room_no: roomNumber + 1,
    title: roomData.roomTitle,
    users: [roomData.roomCreator._id],
    address: roomData.roomCreator.current_address,
  });
};
