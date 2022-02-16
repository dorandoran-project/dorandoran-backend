const httpMocks = require("node-mocks-http");
const roomController = require("../../contorollers/roomController");
const roomService = require("../../services/roomService");
const Room = require("../../models/Room");

jest.mock("../../models/Room");

describe("Room Countroller", () => {
  let res;
  beforeEach(() => {
    res = createResponse();
  });
  it("should render rooms page", () => {
    const req = createRequest({
      url: "/rooms",
      method: "GET",
    });

    roomController.init(req, res);

    expect();
  });
});
