const express = require("express");
const router = express.Router();
const roomController = require("../contorollers/roomController");
const constants = require("../utils/constants");

router.get("/", roomController.getRooms);

router.post("/", roomController.createRoom);

router.get("/:roomId", roomController.getRoom);

module.exports = router;
