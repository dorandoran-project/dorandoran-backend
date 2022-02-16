const httpMocks = require("node-mocks-http");
const authService = require("../../services/authService");

// User.findOne = jest.fn();
// User.create = jest.fn();

const User = require("../../models/User");
jest.mock("../../models/User");
const userInfo = require("../data/userData.json");

// let req, res, next;
// beforeEach(() => {
//   req = httpMocks.createRequest();
//   res = httpMocks.createResponse();
//   next = null;
// });

describe("auth Service test code", () => {
  it("should have a authService function", () => {
    expect(typeof authService.getUser).toBe("function");
  });

  it("find user Email", async () => {
    const user = await authService.getUser(User.email);

    expect(user).toContainEqual({ email: "hansochil@gmail.com" });
  });
});
