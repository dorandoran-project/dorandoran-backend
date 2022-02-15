const express = require("express");
const router = express.Router();
const roomController = require("../contorollers/roomController");
const {
  validateRoom,
  validateRefreshRoom,
  validateNewRoom,
  validateUserAndRoom,
} = require("../middlewares/validate");
const { isNotLoggedIn } = require("../middlewares/isLogged");

router.get("/", isNotLoggedIn, roomController.init);

router.post("/", validateRoom, isNotLoggedIn, roomController.getRooms);

router.post(
  "/refresh",
  validateRefreshRoom,
  isNotLoggedIn,
  roomController.reload
);

router.post("/new", validateNewRoom, isNotLoggedIn, roomController.createRoom);

router.post("/checkUserCount", roomController.countUsers);

router.post("/joinedUser", validateUserAndRoom, roomController.joinedUser);

router.post("/deleteUser", validateUserAndRoom, roomController.deleteUser);

router.post("/detail", roomController.getCurrentRoom);

module.exports = router;
