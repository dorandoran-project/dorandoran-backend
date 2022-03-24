const { createRequest, createResponse } = require("node-mocks-http");
const authService = require("../../services/authService");
const roomService = require("../../services/roomService");
const communityService = require("../../services/communityService");
const roomController = require("../../contorollers/roomController");
const rooms = require("../data/roomData.json");

jest.mock("../../services/authService");
jest.mock("../../services/roomService");
jest.mock("../../services/communityService");
jest.mock("../../models/Room.js");

describe("roomController test", () => {
  let userInfo;

  beforeEach(() => {
    userInfo = {
      name: "김소영",
      email: "sample12@example.com",
      profile: "profileImg",
      age_range: "10~20",
      gender: "male",
      current_address: "서울 강남구",
    };
  });

  afterEach(function () {
    userInfo = null;
  });

  describe("GET /init", () => {
    it("roomController의 init이 함수가 맞는지 type을 체크한다", () => {
      expect(typeof roomController.init).toBe("function");
    });

    it("방 리스트의 초기 리스트의 데이터들을 가져온다", async () => {
      const req = createRequest({
        url: "/rooms",
        method: "GET",
        userInfo,
      });

      const res = createResponse();
      const next = jest.fn(() => (400, { message: "400_Bad_Request" }));

      authService.getAddress = async () => userInfo.current_address;
      roomService.getRooms = async () => rooms;
      roomService.getInitRooms = (allRooms) => {
        return allRooms.slice(0, 6);
      };

      await roomController.init(req, res, next);

      expect(res._getJSONData()).toStrictEqual({ rooms });
      expect(res._isJSON()).toBe(true);
    });
  });

  describe("POST /getRooms", () => {
    it("/rooms rooms를 응답해줘야 한다", async () => {
      const req = createRequest({
        url: "/rooms",
        body: {
          lastRoom: rooms[0],
          direction: "next",
        },
        method: "POST",
        userInfo,
      });

      const res = createResponse();
      const next = jest.fn(() => (400, { message: "400_Bad_Request" }));

      authService.getAddress = async () => userInfo.current_address;
      roomService.getRooms = async () => rooms;

      const lastRoom = req.body.lastRoom;
      const direction = req.body.direction;
      const index = (roomService.getIndex = jest
        .fn()
        .mockReturnValue(lastRoom._id, rooms));

      roomService.findOnePageRooms = jest
        .fn()
        .mockReturnValue(rooms, direction, index);

      await roomController.getRooms(req, res, next);

      expect(res._getData()).toEqual(JSON.stringify({ rooms }));
    });
  });

  describe("POST /reload", () => {
    it("/refresh 방 리스트가 새로 고침 되었을 때 렌더링을 해준다", async () => {
      const req = createRequest({
        url: "/rooms/refresh",
        body: {
          roomList: rooms,
        },
        method: "POST",
      });

      const res = createResponse();
      const next = jest.fn(() => (401, { message: "401_Unauthorized" }));
      const roomList = req.body.roomList;

      roomService.getUpdateRooms = async () => roomList;

      await roomController.reload(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual(JSON.stringify({ rooms }));
    });
  });

  describe("POST /new", () => {
    it("/new 새로운 방을 만들어야 한다 createRoom", async () => {
      const req = createRequest({
        url: "/rooms/new",
        body: {
          roomData: {
            roomCreator: {
              name: "예예예",
              email: "test@sample.com",
              profile:
                "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
              age_range: "20~29",
              gender: "female",
              current_address: "서울 강남구",
            },
            roomTitle: "에에예 님의 여기모여방",
          },
        },
        method: "POST",
      });

      const res = createResponse();
      const next = jest.fn(() => (400, { message: "400_Bad_Request" }));
      const roomData = req.body.roomData;

      const roomNumber = (communityService.getLocationRoomCount = jest
        .fn()
        .mockReturnValue(6));

      const newRoom = (roomService.createRoom = jest.fn(
        () => roomData,
        roomNumber
      ));

      communityService.addCommunityRoom = jest.fn(() => newRoom());

      await roomController.createRoom(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toHaveProperty("newRoom");
    });
  });

  describe("POST /checkUserCount", () => {
    it("방에 참가하고 있는 인원을 체크한다", async () => {
      const req = createRequest({
        url: "/rooms/checkUserCount",
        body: {
          roomId: "62028363530976bb8ea8ab67",
        },
        method: "POST",
      });
      const res = createResponse();
      const next = jest.fn(() => (400, { message: "400_Bad_Request" }));

      roomService.getCountUser = jest.fn().mockReturnValue(2);

      await roomController.countUsers(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toHaveProperty("userCount", 2);
    });
  });

  describe("POST /joinedUser", () => {
    it("방에 참여할 인원을 추가할 때 사용한다", async () => {
      const req = createRequest({
        url: "/rooms/checkUserCount",
        body: {
          currentRoom: "currentRoom",
          currentUser: "currentUser",
        },
        method: "POST",
      });

      const res = createResponse();
      const next = jest.fn(() => (400, { message: "400_Bad_Request" }));
      const currentRoom = req.body.currentRoom;
      const currentUser = req.body.currentUser;

      roomService.getCurrentRoom = jest.fn(() => {
        currentRoom, currentUser;
      });

      await roomController.joinUser(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ success: "200_Success" });
    });
  });

  describe("POST /deleteUser", () => {
    it("참여자를 삭제할때 사용한다", async () => {
      const req = createRequest({
        url: "/rooms/deleteUser",
        body: {
          currentRoom: "currentRoom",
          currentUser: "currentUser",
        },
        method: "POST",
      });

      const res = createResponse();
      const next = jest.fn(() => (400, { message: "400_Bad_Request" }));
      const currentRoom = req.body.currentRoom;
      const currentUser = req.body.currentUser;

      roomService.deleteUserInfo = jest.fn(() => {
        currentRoom, currentUser;
      });

      await roomController.deleteUser(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual(
        JSON.stringify({ success: "200_Success" })
      );
    });
  });

  describe("POST /detail", () => {
    it("현재 룸을 정보를 가져온다 ", async () => {
      const req = createRequest({
        url: "/rooms/detail",
        body: {
          roomId: rooms[0]._id,
        },
        method: "POST",
      });

      const res = createResponse();
      const next = jest.fn(() => (400, { message: "400_Bad_Request" }));
      const roomId = req.body.roomId;

      roomService.getUsers = jest.fn(() => {
        roomId;
      });

      await roomController.getCurrentRoom(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });
});
