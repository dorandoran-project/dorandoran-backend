const express = require("express");
const router = express.Router();
const roomController = require("../contorollers/roomController");
const {
  validateRoom,
  validateRefreshRoom,
  validateNewRoom,
  validateUserAndRoom,
  validateDetailRoom,
} = require("../middlewares/validate");
const { isNotLoggedIn } = require("../middlewares/isLogged");
const authorization = require("../middlewares/authorization");

router.get("/", isNotLoggedIn, authorization, roomController.init);

router.post(
  "/",
  validateRoom,
  isNotLoggedIn,
  authorization,
  roomController.getRooms
);

router.post(
  "/refresh",
  validateRefreshRoom,
  isNotLoggedIn,
  authorization,
  roomController.reload
);

router.post(
  "/new",
  validateNewRoom,
  isNotLoggedIn,
  authorization,
  roomController.createRoom
);

router.post(
  "/joinedUser",
  validateUserAndRoom,
  authorization,
  roomController.joinUser
);

router.post(
  "/deleteUser",
  validateUserAndRoom,
  authorization,
  roomController.deleteUser
);

router.post(
  "/detail",
  validateDetailRoom,
  authorization,
  roomController.getCurrentRoom
);

module.exports = router;
