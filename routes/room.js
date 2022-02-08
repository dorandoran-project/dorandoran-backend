const express = require("express");
const router = express.Router();
const roomController = require("../contorollers/roomController");
const {
  validateRoom,
  validateRefreshRoom,
  validateNewRoom,
} = require("../middlewares/validate");
const { isNotLoggedIn } = require("../middlewares/isLogged");

router.get("/", isNotLoggedIn, roomController.init);

router.post("/", validateRoom, isNotLoggedIn, roomController.getRooms);

router.post(
  "/refresh",
  isNotLoggedIn,
  validateRefreshRoom,
  roomController.reload
);

router.post("/new", validateNewRoom, isNotLoggedIn, roomController.createRoom);

module.exports = router;
