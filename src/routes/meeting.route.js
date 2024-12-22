// src/routes/meeting.route.js
const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meeting.controller");

router.post("/meetings", meetingController.createMeeting);
router.get("/meetings", meetingController.fetchMeetings);
router.put("/meetings/:id", meetingController.updateMeeting);
router.delete("/meetings/:id", meetingController.deleteMeeting);

module.exports = router;
