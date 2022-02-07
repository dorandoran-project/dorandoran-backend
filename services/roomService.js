const Room = require("../models/Room");

exports.getInitRooms = (allRooms) => {
  return allRooms.slice(0, 6);
};

exports.getRooms = async () => {
  return await Room.find({}).populate("users").exec();
};

exports.getIndex = (id, rooms) => {
  let index = null;

  rooms.forEach((room, i) => {
    if (room._id.toString() === id) {
      index = i;
    }
  });

  return index + 1;
};

exports.getUpdateRooms = async (rooms) => {
  const updateRooms = [];

  for (let i = 0; i < rooms.length; i++) {
    const newRoom = await Room.findById({ _id: rooms[i]._id })
      .populate("users")
      .exec();
    updateRooms.push(newRoom);
  }

  return updateRooms;
};

exports.findOnePageRooms = (AllRooms, direction, index) => {
  const rooms = [];
  const lastIndex = index - 1;
  const copy = AllRooms.slice();
  let roomsCopy = AllRooms.slice(index, AllRooms.length);
  let i = lastIndex - 6;

  while (rooms.length < 6) {
    if (direction === "next") {
      let room = roomsCopy.shift();

      if (!room) {
        roomsCopy = AllRooms.slice();
        room = roomsCopy.shift();
      }

      rooms.push(room);
    }

    if (direction === "prev") {
      if (i < 0) {
        i = i + AllRooms.length;
      }

      const room = copy[i];

      i -= 1;

      rooms.unshift(room);
    }
  }

  return rooms;
};

exports.createRoom = async (roomData, roomNumber) => {
  const newRoom = await Room.create({
    room_no: roomNumber + 1,
    title: roomData.roomTitle,
    users: [roomData.roomCreator._id],
    address: roomData.roomCreator.current_address,
  });

  return newRoom;
};
