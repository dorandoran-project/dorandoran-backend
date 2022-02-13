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

    socket.on("enterRoom", (userInfo) => {
      const { roomId } = userInfo;
      socket.join(roomId);
      socket["roomId"] = roomId;
      userInfo.id = socket.id;

      if (!characterIo[roomId]) {
        characterIo[roomId] = [userInfo];
      } else {
        characterIo[roomId].push(userInfo);
      }

      characterIo.to(roomId).emit("setCharacters", characterIo[roomId]);
    });

    socket.on("changeCurrentCharacter", (x, y, side, moveCount) => {
      if (characterIo[socket["roomId"]]) {
        const player = characterIo[socket["roomId"]].find(
          (player) => player.id === socket.id
        );

        const index = characterIo[socket["roomId"]].indexOf(player);

        player.x = x;
        player.y = y;
        player.side = side;
        player.moveCount = moveCount;

        characterIo[socket["roomId"]].splice(index, 1, player);

        characterIo
          .to(socket["roomId"])
          .emit("setCharacters", characterIo[socket["roomId"]]);
      }
    });

    socket.on("exitUser", () => {
      if (characterIo[socket["roomId"]]?.length > 0) {
        characterIo[socket["roomId"]] = characterIo[socket["roomId"]].filter(
          (user) => {
            return user.id !== socket.id;
          }
        );

        socket
          .to(socket["roomId"])
          .emit("setCharacters", characterIo[socket["roomId"]]);
        socket.leave(socket["roomId"]);
      }
    });

    socket.on("disconnecting", () => {
      console.log("Character Socket Disconnecting");
    });
    socket.on("disconnect", () => {
      console.log("Character Socket Disconnect");
    });
  });

  const rooms = {};

  videoIo.on("connection", (socket) => {
    socket.onAny((event) => console.log(`Video Socket Event: ${event}`));

    socket.on("joinRoom", (roomName) => {
      if (rooms[roomName]) {
        rooms[roomName].push(socket.id);
      } else {
        rooms[roomName] = [socket.id];
      }

      // const otherUser = rooms[roomName].find((id) => id !== socket.id);
      // if (otherUser) {
      //   socket.emit("otherUser", otherUser);
      // socket.to(otherUser).emit("userJoined", socket.id);
      // }
      const otherUsers = rooms[roomName].filter((id) => id !== socket.id);
      if (otherUsers.length) {
        socket.to(roomName).emit("otherUser", otherUsers);
        otherUsers.forEach((userId) => {
          socket(userId).emit("userJoined", socket.id);
        });
      }
    });

    socket.on("offer", (payload) => {
      videoIo.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", (payload) => {
      videoIo.to(payload.target).emit("answer", payload);
    });

    socket.on("iceCandidate", (incoming) => {
      videoIo.to(incoming.target).emit("iceCandidate", incoming.candidate);
    });
  });
};
