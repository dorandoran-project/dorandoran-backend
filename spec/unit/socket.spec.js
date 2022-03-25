const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("Socket Test", () => {
  let io, serverSocket, clientSocket;

  const makeRandomGenderImage = () => {
    const randomImage = ["1.png", "2.png"];
    const randomIndex = Math.floor(Math.random() * 2);

    return randomImage[randomIndex];
  };

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);

    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);

      io.on("connection", (socket) => {
        serverSocket = socket;
      });

      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("Server Socket /on /enterRoom", (done) => {
    const userInfo = {
      roomId: "123456789abcdefghijklmnopqrstuvwxyz",
      gender: "male",
    };

    serverSocket.on("enterRoom", (cb) => {
      cb(userInfo);
    });

    clientSocket.emit("enterRoom", (userInfo) => {
      const { roomId } = userInfo;
      serverSocket.join(roomId);
      serverSocket["roomId"] = roomId;
      userInfo.id = clientSocket.id;

      if (userInfo.gender === "female") {
        userInfo.type = `${userInfo.type}female${makeRandomGenderImage()}`;
      } else {
        userInfo.type = `${userInfo.type}male${makeRandomGenderImage()}`;
      }

      if (!io[roomId]) {
        io[roomId] = [userInfo];
      } else {
        io[roomId].push(userInfo);
      }

      if (io["positions"]) {
        io.to(roomId).emit("setCurrentUserPosition", io["positions"]);
      }

      io.to(roomId).emit("setCharacters", io[roomId]);

      expect(userInfo.gender).toBe("male");
      expect(userInfo.roomId).toBe(serverSocket["roomId"]);
      expect(io[roomId].length).toBe(1);
      expect(io["position"]).toBe(undefined);
    });

    clientSocket.on("setCharacters", (roomInfo) => {
      expect(roomInfo[0].roomId).toBe(userInfo.roomId);
      expect(roomInfo[0].gender).toBe(userInfo.gender);
      done();
    });
  });
});
