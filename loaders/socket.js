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
    // socket.onAny((event) => console.log(`Character Socket Event: ${event}`));

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

    socket.on("changeCurrentCharacter", (x, y, side, moveCount, isChatting) => {
      if (characterIo[socket["roomId"]]) {
        const player = characterIo[socket["roomId"]].find(
          (player) => player.id === socket.id
        );

        const index = characterIo[socket["roomId"]].indexOf(player);

        player.x = x;
        player.y = y;
        player.side = side;
        player.moveCount = moveCount;
        player.isChatting = isChatting;

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

  const users = [];
  videoIo.on("connection", (socket) => {
    socket.onAny((event) => console.log(`Video Socket Event: ${event}`));

    socket.on("enterRoom", (roomName) => {
      socket.join(roomName);
      users.push(socket.id);
      videoIo[socket.id] = roomName;

      if (videoIo[roomName]) {
        videoIo[roomName].push(socket.id);
      } else {
        videoIo[roomName] = [socket.id];
      }

      const otherUsers = videoIo[roomName].filter((id) => id !== socket.id);
      socket.emit("enterRoom", otherUsers);
    });

    socket.on("offer", (payload) => {
      videoIo.to(payload.target).emit("offer", {
        signal: payload.signal,
        caller: payload.caller,
      });
    });

    socket.on("answer", (payload) => {
      videoIo.to(payload.target).emit("answer", {
        signal: payload.signal,
        caller: socket.id,
      });
    });

    socket.on("leaveRoom", () => {
      const roomName = videoIo[socket.id];

      if (videoIo[roomName]) {
        videoIo[roomName] = videoIo[roomName].filter((id) => id !== socket.id);
      }

      videoIo[socket.id] = undefined;
      socket.to(roomName).emit("exitRoom", socket.id);
      socket.leave(roomName);
    });

    socket.on("disconnect", () => {
      const user = users.find((id) => id === socket.id);
      const roonName = videoIo[socket.id];

      if (user) {
        if (videoIo[roonName]) {
          videoIo[roonName] = videoIo[roonName].filter(
            (id) => id !== socket.id
          );
        }

        socket.to(roonName).emit("exitRoom", socket.id);
        socket.leave(roonName);
        videoIo[socket.id] = undefined;
      }
    });
  });
};
