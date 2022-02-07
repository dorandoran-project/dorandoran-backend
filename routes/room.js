const express = require("express");
const router = express.Router();
const roomController = require("../contorollers/roomController");

router.get("/", roomController.init);

router.post("/", roomController.getRooms);

router.post("/refresh", roomController.reload);

// router.post("/", roomController.createRoom);

module.exports = router;
