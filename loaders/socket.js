const { Server } = require("socket.io");
module.exports = (server, app) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  app.set("io", io);

  const characterIo = io.of("/character");
  const videoIo = io.of("/video");

  characterIo.on("connection", (socket) => {
    socket.onAny((event) => console.log(`Character Socket Event: ${event}`));

    socket.on("hello", (roomId, image) => {
      socket.join(roomId);
      socket["roomId"] = roomId;

      if (!characterIo[roomId]) {
        characterIo[roomId] = [[socket.id, image]];
      } else {
        characterIo[roomId].push([socket.id, image]);
      }

      characterIo.to(roomId).emit("visitedUser", characterIo[roomId]);
    });

    socket.on("moveCharacter", (char) => {
      console.log('socket["roomId"]', socket["roomId"]);
      // socket["roomId"] = char;
      socket.to(socket["roomId"]).emit("movePosition", char);
    });
    socket.on("exitUser", (roomId) => {
      if (characterIo[roomId]?.length > 0) {
        const index = characterIo[roomId].indexOf(socket.id);
        characterIo[roomId].splice(index, 1);
        characterIo.to(roomId).emit("userInRoom", characterIo[roomId]);
        socket.leave(roomId);
        characterIo[roomId] = null;
      }
    });

    socket.on("disconnecting", () => {
      console.log("Character Socket Disconnecting");
    });
    socket.on("disconnect", () => {
      console.log("Character Socket Disconnect");
    });
  });
  videoIo.on("connection", (socket) => {
    socket.onAny((event) => console.log(`Video Socket Event: ${event}`));
    socket.on("enterRoom", (roomName, peerId) => {
      socket.join(roomName);
      if (!socket["peerId"]) {
        socket["peerId"] = peerId;
        socket["roomName"] = roomName;
      }
      if (!videoIo[roomName]) {
        videoIo[roomName] = [peerId];
      } else {
        videoIo[roomName].push(peerId);
      }
      videoIo.to(roomName).emit("roomChange", videoIo[roomName]);
      socket.to(roomName).emit("welcome", peerId);
    });
    socket.on("disconnecting", () => {
      console.log("socket disconnecting");
      if (videoIo[socket["roomName"]]?.length > 0) {
        videoIo[socket["roomName"]] = videoIo[socket["roomName"]].filter(
          (id) => {
            return id !== socket["peerId"];
          }
        );
        socket.to(socket["roomName"]).emit("bye", socket["peerId"]);
        socket.leave(socket["roomName"]);
        socket["peerId"] = null;
        socket["roomName"] = null;
      }
    });
    socket.on("disconnect", () => {
      console.log("socket disconnect");
    });
  });
};
