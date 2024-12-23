const {
  addMeeting,
  getMeetings: getMeetingsFromModel,
  getMeetingById,
  updateMeeting: updateMeetingInModel,
  deleteMeeting: deleteMeetingFromModel,
} = require("../models/meeting.model");

function createMeeting(req, res) {
  const {
    id,
    date,
    time,
    duration,
    participants,
    description,
    location,
    title,
  } = req.body;

  if (!date || !time || !duration || !participants || !location || !title) {
    return res.status(400).send("Missing required meeting details");
  }

  const meeting = {
    id,
    date,
    time,
    duration,
    participants,
    description,
    location,
    title,
  };

  addMeeting(meeting);
  res.status(201).json(meeting);
}

function fetchMeetings(req, res) {
  const meetings = getMeetingsFromModel();
  res.json(meetings);
}

function updateMeeting(req, res) {
  const meetingId = req.params.id;
  const { date, time, duration, participants, location, title } = req.body;

  const meeting = getMeetingById(meetingId);
  if (!meeting) {
    return res.status(404).send("Meeting not found");
  }

  const updatedMeeting = {
    date,
    time,
    duration,
    participants,
    location,
    title,
  };
  updateMeetingInModel(meetingId, updatedMeeting);

  res.json(updatedMeeting);
}

function deleteMeeting(req, res) {
  const meetingId = req.params.id;

  try {
    const meeting = getMeetingById(meetingId);
    if (!meeting) {
      return res.status(404).send("Meeting not found");
    }

    deleteMeetingFromModel(meetingId);

    res.status(200).json({ id: meetingId });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res.status(500).send("An error occurred while deleting the meeting");
  }
}

module.exports = {
  createMeeting,
  fetchMeetings,
  updateMeeting,
  deleteMeeting,
};
