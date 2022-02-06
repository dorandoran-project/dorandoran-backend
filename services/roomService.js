const Room = require("../models/Room");

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

exports.getInitRooms = (allRooms) => {
  return allRooms.slice(0, 6);
};

exports.getUpdateRooms = async (rooms) => {
  const updateRooms = [];

  for (let i = 0; i < rooms.length; i++) {
    const newRoom = await Room.findById({ _id: rooms[i]._id })
      .populate("users")
      .exec();
    updateRooms.push(newRoom);
  }

  console.log("update Rooms", updateRooms);
  return updateRooms;
};

exports.findOnePageRooms = (AllRooms, direction, index) => {
  const rooms = [];
  let roomsCopy = AllRooms.slice(index, AllRooms.length);
  const lastIndex = index - 1;
  let i = lastIndex - 6;
  const copy = AllRooms.slice();

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
        i = AllRooms.length - 1;
      }

      const room = copy[i];

      i--;

      rooms.unshift(room);
    }
  }

  return rooms;
};
