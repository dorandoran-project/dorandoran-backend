const Room = require("../models/Room");
const User = require("../models/User");
const Community = require("../models/Community");

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
    return AllRooms;
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

exports.getCurrentRoom = async (room, user) => {
  const currentUser = await User.findById({ _id: user }).exec();
  const currentRoom = await Room.find({ _id: room }).populate("users").exec();

  currentRoom[0].users.push(currentUser);
  await currentRoom[0].save();
};

exports.deleteUserInfo = async (roomId, userId) => {
  const room = await Room.findById({ _id: roomId }).exec();

  if (room.users.length < 2) {
    const community = await Community.findOne({ name: room.address }).exec();

    const updateCommunity = community.rooms.filter(
      (roomObjectId) => roomObjectId.toString() !== roomId
    );

    community.rooms = updateCommunity;

    await community.save();

    await Room.deleteOne({ _id: roomId }).exec();

    return;
  }

  const result = room.users
    .map((user) => {
      if (user._id.toString() !== userId.toString()) {
        return user;
      }
    })
    .filter((user) => user !== undefined);

  room.users = result;

  await room.save();
};
