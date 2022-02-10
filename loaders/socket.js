const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.onAny((event) => console.log(`Socket Event: ${event}`));

    socket.on("enterRoom", (roomName, peerId) => {
      socket.join(roomName);

      if (!socket["peerId"]) {
        socket["peerId"] = peerId;
        socket["roomName"] = roomName;
      }

      if (!io[roomName]) {
        io[roomName] = [peerId];
      } else {
        io[roomName].push(peerId);
      }

      io.to(roomName).emit("roomChange", io[roomName]);
      socket.to(roomName).emit("welcome", peerId);
    });

    socket.on("disconnecting", () => {
      console.log("socket disconnecting");

      if (io[socket["roomName"]]?.length > 0) {
        io[socket["roomName"]] = io[socket["roomName"]].filter((id) => {
          return id !== socket["peerId"];
        });

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
