const httpMocks = require("node-mocks-http");
const authController = require("../../contorollers/authController");
const authService = require("../../services/authService");
const User = require("../../models/User");
const userInfo = require("../data/userData.json");

User.findOne = jest.fn();
User.create = jest.fn();

describe("auth controller test code", () => {
  it("should hava a getUserInformation function", () => {
    expect(typeof authController.getUserInformation).toBe("function");
  });

  it("should hava a login function", () => {
    expect(typeof authController.login).toBe("function");
  });

  it("should hava a logout function", () => {
    expect(typeof authController.logout).toBe("function");
  });
});

describe("auth Service test code", () => {
  it("should have a authService function", () => {
    expect(typeof authService.getUser).toBe("function");
  });

  it("should get user email Info User.getUser", () => {
    authService.getUser();
    expect(User.findOne).toBeCalled();
  });

  // 현재 여기 수정중
  // it("should call User.create", () => {
  //   let req = httpMocks.createRequest();
  //   let res = httpMocks.createResponse();
  //   let next = null;
  //   req.body = req.userInfo;
  //   authService.createUser(req, res, next);
  //   expect(User.create).toBe(userInfo);
  // });
});
