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
const authorize = require("../middlewares/authorize");

router.get("/", isNotLoggedIn, authorize, roomController.init);

router.post(
  "/",
  validateRoom,
  isNotLoggedIn,
  authorize,
  roomController.getRooms
);

router.post(
  "/refresh",
  validateRefreshRoom,
  isNotLoggedIn,
  authorize,
  roomController.reload
);

router.post(
  "/new",
  validateNewRoom,
  isNotLoggedIn,
  authorize,
  roomController.createRoom
);

router.post(
  "/joinedUser",
  validateUserAndRoom,
  isNotLoggedIn,
  authorize,
  roomController.joinUser
);

router.post(
  "/deleteUser",
  validateUserAndRoom,
  isNotLoggedIn,
  authorize,
  roomController.deleteUser
);

router.post(
  "/detail",
  validateDetailRoom,
  isNotLoggedIn,
  authorize,
  roomController.getCurrentRoom
);

module.exports = router;
