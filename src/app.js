const express = require("express");
const bodyParser = require("body-parser");
const meetingRoutes = require("./routes/meeting.route");
const userRoutes = require("./routes/user.route");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api", meetingRoutes);
app.use("/api", userRoutes);

app.use("/", (req, res) => {
  res.send("Welcome to the Meeting Planner API");
});

const port = process.env.PORT || 9000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app, server };
