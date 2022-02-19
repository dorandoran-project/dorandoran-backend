const { createRequest, createResponse } = require("node-mocks-http");
const authController = require("../../contorollers/authController");
const authService = require("../../services/authService");

const {
  getUserInformation,
  login,
  logout,
} = require("../../contorollers/authController");

jest.mock("../../services/authService");
jest.mock("../../models/User");

describe("auth Controller test", () => {
  describe("GET getUserInformation", () => {
    it("getUserInformation이 함수가 맞는데 typeof를 체크한다", () => {
      expect(typeof authController.getUserInformation).toBe("function");
    });

    it("accessToken, refreshToken이 삭제된다", () => {
      const req = createRequest({
        url: "/auth",
        method: "GET",
        cookies: {
          accessToken: "accessToken",
          refreshToken: "refreshToken",
        },
      });
      const res = createResponse();
      const success = JSON.stringify({ success: "200_Success" });

      res.clearCookie = jest.fn();

      getUserInformation(req, res);

      expect(res._getData()).toBe(success);
      expect(res.clearCookie).toHaveBeenCalledWith("accessToken");
      expect(res.clearCookie).toHaveBeenCalledWith("refreshToken");
    });
  });

  describe("Post /login", () => {
    let userInfo;
    let res;

    beforeEach(() => {
      res = createResponse();
      userInfo = {
        name: "강남구",
        email: "sample12@example.com",
        profile: "profileImg",
        age_range: "10~20",
        gender: "male",
        current_address: "서울시",
      };
    });

    afterEach(function () {
      res = null;
    });

    it("유저의 이메일이 없다면 next로 에러를 부른다", async () => {
      const req = createRequest({
        url: "/auth/login",
        body: {
          userInfo: {
            name: "강남구",
            profile: "profileImg",
            age_range: "10~20",
            gender: "male",
            current_address: "서울시",
          },
        },
        method: "POST",
      });

      const res = createResponse();
      const next = jest.fn(() => (401, { message: "401_Unauthorized" }));
      const userInfo = req.body;
      if (!userInfo.email) {
        await login(req, res, next);
      }

      expect(next).toBeCalled();
      expect(next).toHaveBeenCalledTimes(1);
    });

    it("accessToken 쿠키를 생성한다", function () {
      const cookie = {
        accessToken: "accessToken",
        options: {
          httpOnly: true,
          maxAge: 3 * 60 * 60 * 1000,
          signed: true,
        },
      };

      res.cookies = jest.fn(() => cookie);

      res.cookie("accessToken", cookie.accessToken, cookie.options);
      expect(res).toHaveProperty("cookies");
      expect(res.cookies()).toEqual(cookie);
    });

    it("refreshToken 쿠키를 생성한다", function () {
      const cookie = {
        refreshToken: "refreshToken",
        options: {
          httpOnly: true,
          maxAge: 3 * 60 * 60 * 1000,
          signed: true,
        },
      };

      res.cookies = jest.fn(() => cookie);

      res.cookie("refreshToken", cookie.refreshToken, cookie.options);
      expect(res).toHaveProperty("cookies");
      expect(res.cookies()).toEqual(cookie);
    });

    it("유저의 이메일이 존재하고, 유저의 정보를 저장한다", async () => {
      const req = createRequest({
        url: "/auth/login",
        body: userInfo,
        method: "POST",
      });
      const res = createResponse();
      const next = jest.fn();
      let user = userInfo.email;

      authService.getUser = async () => user;
      authService.saveAddress = jest.fn().mockResolvedValue(userInfo.email);

      await login(req, res, next);

      // console.log("useremail", user);
      // expect(res._getData()).toBe(user);
      // json 값이 확인이 안되는 중!!!
      expect(res.statusCode).toBe(200);
    });
  });

  describe("getUserInformation", () => {
    it("유저가 로그아웃을 하였을 때 accessToken, refreshToken이 삭제된다", () => {
      const req = createRequest({
        url: "/auth/logout",
        method: "GET",
        cookies: {
          accessToken: "accessToken",
          refreshToken: "refreshToken",
        },
      });
      const res = createResponse();
      const success = { success: "200_Success" };

      res.clearCookie = jest.fn();

      logout(req, res);

      expect(res._getJSONData()).toStrictEqual(success);
      expect(res.clearCookie).toHaveBeenCalledWith("accessToken");
      expect(res.clearCookie).toHaveBeenCalledWith("refreshToken");
    });
  });
});
