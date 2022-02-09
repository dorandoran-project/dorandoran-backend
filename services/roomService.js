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
  const prevRooms = AllRooms.slice();
  let nextRooms = AllRooms.slice(index, AllRooms.length);
  let i = lastIndex - 6;

  if (AllRooms.length <= 5) {
    const rooms = AllRooms;

    return rooms;
  } else {
    while (rooms.length < 6) {
      if (direction === "next") {
        let room = nextRooms.shift();

        if (!room) {
          nextRooms = AllRooms.slice();
          room = nextRooms.shift();
        }

        rooms.push(room);
      }

      if (direction === "prev") {
        if (i < 0) {
          i = AllRooms.length - 1;
        }

        const room = prevRooms[i];

        i--;

        rooms.unshift(room);
      }
    }

    return rooms;
  }
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
