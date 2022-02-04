require("dotenv").config();
const mongoose = require("mongoose");
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/auth");
const roomRouter = require("./routes/room");
const videoRouter = require("./routes/video");

const constants = require("./utils/constants");

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("MONGO DB CONNECT FAILURE");
    } else {
      console.log("MONGO DB CONNECT SUCCESS");
    }
  }
);

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/auth", authRouter);
app.use("/rooms", roomRouter);
app.use("/videoChat", videoRouter);

app.use(function (req, res, next) {
  next(createError(404, { message: constants.NOT_FOUND }));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
