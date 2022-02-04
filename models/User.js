const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [1, "이름은 최소 1자 이상이어야 합니다."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "이메일은 최소 5자 이상이어야 합니다."],
    validate: [validator.isEmail, "이메일 형식이 올바르지 않습니다."],
  },
  profile: {
    type: String,
    required: true,
  },
  age_range: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  current_address: {
    type: String,
    required: true,
    minlength: [1, "지역이름은 최소 1자 이상이어야 합니다."],
  },
  refresh_token: {
    type: String,
    required: true,
    minlength: [validator.isJWT, "jwt 토큰이 형식이 아닙니다."],
  },
});

module.exports = mongoose.model("User", userSchema);
