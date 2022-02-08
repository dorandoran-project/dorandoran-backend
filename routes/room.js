const express = require("express");
const router = express.Router();
const roomController = require("../contorollers/roomController");

router.get("/", roomController.getRooms);

router.post("/new", roomController.createRoom);

module.exports = router;
