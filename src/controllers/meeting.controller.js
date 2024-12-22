// src/controllers/meeting.controller.js
const {
  addMeeting,
  getMeetings: getMeetingsFromModel,
  getMeetingById,
  updateMeeting: updateMeetingInModel,
  deleteMeeting: deleteMeetingFromModel,
} = require("../models/Meeting.model");

function createMeeting(req, res) {
  const { date, time, duration, participants } = req.body;

  if (!date || !time || !duration || !participants) {
    return res.status(400).send("Missing required meeting details");
  }

  const meeting = {
    id: Date.now().toString(),
    date,
    time,
    duration,
    participants,
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
  const { date, time, duration, participants } = req.body;

  const meeting = getMeetingById(meetingId);
  if (!meeting) {
    return res.status(404).send("Meeting not found");
  }

  const updatedMeeting = { date, time, duration, participants };
  updateMeetingInModel(meetingId, updatedMeeting);

  res.json(updatedMeeting);
}

function deleteMeeting(req, res) {
  const meetingId = req.params.id;

  const meeting = getMeetingById(meetingId);
  if (!meeting) {
    return res.status(404).send("Meeting not found");
  }

  deleteMeetingFromModel(meetingId);
  res.status(204).send();
}

module.exports = {
  createMeeting,
  fetchMeetings,
  updateMeeting,
  deleteMeeting,
};
