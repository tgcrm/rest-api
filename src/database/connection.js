const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.REACT_APP_URI;
mongoose
  .connect(URI, {})
  .then(() => {
    console.log("Connection with DB successfull");
  })
  .catch((e) => console.log("no Connection", e));
