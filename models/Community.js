const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [1, "커뮤니티 이름은 최소 1자 이상이어야 합니다."],
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

module.exports = mongoose.model("Community", communitySchema);
