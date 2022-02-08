const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room_no: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  address: {
    type: String,
    required: true,
    minlength: [1, "주소는 최소 1자 이상이어야 합니다."],
  },
  room_no: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);
