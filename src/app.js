const express = require("express");
const bodyParser = require("body-parser");
const meetingRoutes = require("./routes/meeting.route");
const userRoutes = require("./routes/user.route");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.use("/api", meetingRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
