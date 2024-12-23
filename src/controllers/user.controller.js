const { addUser, getUsers } = require("../models/user.model");
const {
  getMeetings: getMeetingsFromModel,
} = require("../models/Meeting.model");

function createUser(req, res) {
  const { id, name, email, role } = req.body;

  if (!id || !name || !email || !role) {
    return res.status(400).send("Missing required user details");
  }

  const newUser = { id, name, email, role };
  addUser(newUser);

  res.status(201).json(newUser);
}

function fetchUsers(req, res) {
  const users = getUsers();
  res.json(users);
}

function fetchAvailableTimeSlots(req, res) {
  const userId = req.params.userId;

  // Fetching all meetings and filter by user
  const meetings = getMeetingsFromModel();
  const userMeetings = meetings.filter((meeting) =>
    meeting.participants.includes(userId)
  );

  if (!userMeetings) {
    return res.status(404).send("No meetings found for the user");
  }

  // Let's say the user's working hours is 9 AM to 5 PM
  const workingHours = { start: 9, end: 17 };
  const timeSlots = [];

  // Loop through the day and find available slots
  for (let hour = workingHours.start; hour < workingHours.end; hour++) {
    const isSlotTaken = userMeetings.some(
      (meeting) =>
        new Date(meeting.time).getHours() === hour &&
        meeting.participants.includes(userId)
    );

    if (!isSlotTaken) {
      timeSlots.push(`${hour}:00 - ${hour + 1}:00`);
    }
  }

  res.json({ userId, availableTimeSlots: timeSlots });
}

module.exports = {
  createUser,
  fetchUsers,
  fetchAvailableTimeSlots,
};
