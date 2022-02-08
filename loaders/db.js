const mongoose = require("mongoose");

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
