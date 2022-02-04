const express = require("express");
const router = express.Router();
const videoController = require("../contorollers/videoController");
const constants = require("../utils/constants");

router.get("/:roomId", videoController.getVideoChatRoom);

module.exports = router;
