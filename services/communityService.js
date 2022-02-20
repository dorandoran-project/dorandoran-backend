const Community = require("../models/Community");

exports.getLocationRoomCount = async (address) => {
  const total = await Community.find({}).exec();
  let count = 0;

  total.forEach((community) => {
    if (community.name === address) {
      count = community.rooms.length;
    }
  });

  return count;
};

exports.addCommunityRoom = async (room) => {
  const allCommunity = await Community.find({}).exec();
  console.log("ROOM", room);

  allCommunity.forEach(async (community) => {
    if (community.name === room.address) {
      community.rooms.push(room);
      await community.save();
      return;
    } else {
      await Community.create({
        name: room.address,
        rooms: [room],
      });
      return;
    }
  });
};
