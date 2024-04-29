const express = require("express");
const cors = require("cors");
require("./src/database/connection");
const StatusRoute = require("./src/routers/status");
const SourceRoute = require("./src/routers/source");
const CourseRoute = require("./src/routers/course");
const MemberRoute = require("./src/routers/member");
const LoginRoute = require("./src/routers/login");
const LeadsRoute = require("./src/routers/leads");
const PerformanceRoute = require("./src/routers/performance");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(MemberRoute);
app.use(LoginRoute);
app.use(CourseRoute);
app.use(StatusRoute);
app.use(SourceRoute);
app.use(LeadsRoute);
app.use(PerformanceRoute);

app.get("/", (req, res) => {
  res.send("Server Is Responding");
});

module.exports = app;
