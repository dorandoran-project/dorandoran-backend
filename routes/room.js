const express = require("express");
const router = express.Router();
const roomController = require("../contorollers/roomController");
const {
  validateRoom,
  validateRefreshRoom,
  validateNewRoom,
  validatejoinRoom,
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

router.post("/joinedUser", validatejoinRoom, roomController.joinedUser);

// router.post("/deleteUser", validateDeleteInfo, roomController.deleteUser);
router.post("/deleteUser", roomController.deleteUser);

module.exports = router;
