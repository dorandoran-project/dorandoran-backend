const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URI],
      methods: ["GET", "POST"],
    },
  });

  const characterIo = io.of("/character");
  const videoIo = io.of("/video");

  const makeRandomGenderImage = () => {
    const randomImage = ["1.png", "2.png"];
    const randomIndex = Math.floor(Math.random() * 2);

    return randomImage[randomIndex];
  };

  const seatObj = {};
  characterIo.on("connection", (socket) => {
    socket.onAny((event) => console.log(`Character Socket Event: ${event}`));

    socket.on("enterRoom", (userInfo) => {
      const { roomId } = userInfo;
      socket.join(roomId);
      socket["roomId"] = roomId;
      userInfo.id = socket.id;

      if (userInfo.gender === "female") {
        userInfo.type = `${userInfo.type}female${makeRandomGenderImage()}`;
      } else {
        userInfo.type = `${userInfo.type}male${makeRandomGenderImage()}`;
      }

      if (!characterIo[roomId]) {
        characterIo[roomId] = [userInfo];
      } else {
        characterIo[roomId].push(userInfo);
      }

      if (Object.keys(seatObj).length > 0) {
        characterIo.to(roomId).emit("setCurrentUserPosition", seatObj[roomId]);
      }

      characterIo.to(roomId).emit("setCharacters", characterIo[roomId]);
    });

    socket.on("enterChattingRoom", (posIndex, x, y, roomId) => {
      if (posIndex) {
        if (seatObj[roomId].length === 0) {
          seatObj[roomId] = [];
          seatObj[roomId].push({ inToRoom: true, posIndex, x, y });
        } else {
          const chairPosition = seatObj[roomId].find(
            (position) => position.posIndex === posIndex
          );

          if (chairPosition) {
            chairPosition.inToRoom = true;
            const index = seatObj[roomId].indexOf(chairPosition);
            seatObj[roomId].splice(index, 1, chairPosition);
          } else {
            seatObj[roomId].push({ inToRoom: true, posIndex, x, y });
          }
        }
      }

      characterIo.to(roomId).emit("setCurrentUserPosition", seatObj[roomId]);
    });

    socket.on("exitChattingRoom", (posIndex, roomId) => {
      if (seatObj[roomId]) {
        const chairPosition = seatObj[roomId].find(
          (position) => position.posIndex === posIndex
        );

        chairPosition.inToRoom = false;
        const index = seatObj[roomId].indexOf(chairPosition);
        seatObj[roomId].splice(index, 1, chairPosition);

        characterIo.to(roomId).emit("setCurrentUserPosition", seatObj[roomId]);
      }
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
      if (characterIo[socket["roomId"]].length > 0) {
        characterIo[socket["roomId"]] = characterIo[socket["roomId"]].filter(
          (user) => {
            return user.id !== socket.id;
          }
        );

        characterIo
          .to(socket["roomId"])
          .emit("setCharacters", characterIo[socket["roomId"]]);

        if (characterIo[socket["roomId"]].length === 0) {
          seatObj[socket["roomId"]] = null;
        }

        socket.leave(socket["roomId"]);
        socket["roomId"] = null;
      }
    });
  });

  const users = [];
  const participants = {};

  videoIo.on("connection", (socket) => {
    socket.onAny((event) => console.log(`Video Socket Event: ${event}`));

    socket.on("sendEvent", (payload) => {
      socket.to(payload.target).emit("receiveEvent", {
        sender: socket.id,
        content: payload.content,
      });
    });

    socket.on("enterRoom", (roomName, userName) => {
      users.push(socket.id);
      socket.join(roomName);
      videoIo[socket.id] = roomName;
      participants[socket.id] = userName;

      if (videoIo[roomName]) {
        videoIo[roomName].push(socket.id);
        participants[roomName].push(userName);
      } else {
        videoIo[roomName] = [socket.id];
        participants[roomName] = [userName];
      }

      const otherUsers = videoIo[roomName].filter((id) => id !== socket.id);

      if (otherUsers.length) {
        socket.emit("enterRoom", otherUsers);
      }

      videoIo.to(roomName).emit("participants", participants);
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
        userName: participants[socket.id],
      });
    });

    socket.on("leaveRoom", (leaveUserName) => {
      const roomName = videoIo[socket.id];

      if (videoIo[roomName]) {
        videoIo[roomName] = videoIo[roomName].filter((id) => id !== socket.id);
      }

      if (participants[roomName]) {
        participants[roomName] = participants[roomName].filter((name) => {
          name !== leaveUserName;
        });
      }

      participants[socket.id] = undefined;
      videoIo[socket.id] = undefined;
      socket.to(roomName).emit("exitRoom", socket.id, participants);
      socket.leave(roomName);
    });

    socket.on("disconnect", () => {
      const user = users.find((id) => id === socket.id);
      const roomName = videoIo[socket.id];

      if (user) {
        if (videoIo[roomName]) {
          videoIo[roomName] = videoIo[roomName].filter(
            (id) => id !== socket.id
          );
        }

        if (participants[roomName]) {
          participants[roomName] = participants[roomName].filter((name) => {
            return name !== participants[socket.id];
          });
        }

        socket.to(roomName).emit("exitRoom", socket.id);
        socket.leave(roomName);
        videoIo[socket.id] = undefined;
      }
    });
  });
};
