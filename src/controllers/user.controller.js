const { addUser, getUsers } = require("../models/user.model");
const {
  getMeetings: getMeetingsFromModel,
} = require("../models/meeting.model");

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
  const selectedDate = new Date(req.query.date);

  // Fetching all meetings and filter by user
  const meetings = getMeetingsFromModel();
  const userMeetings = meetings.filter((meeting) =>
    meeting.participants.includes(userId)
  );

  // User's working hours
  const workingHours = { start: 9, end: 17 };
  const timeSlots = [];

  // Loop through the day and find available slots
  for (let hour = workingHours.start; hour < workingHours.end; hour++) {
    const slotStartTime = new Date(selectedDate);
    slotStartTime.setHours(hour, 0, 0, 0); // Set hour and reset minutes, seconds, milliseconds

    const slotEndTime = new Date(selectedDate);
    slotEndTime.setHours(hour + 1, 0, 0, 0); // Set hour to one hour later

    const isSlotTaken = userMeetings.some((meeting) => {
      // Parse meeting start and end times
      const meetingDate = new Date(meeting.date);
      const [meetingHour, meetingMinute] = meeting.time.split(":").map(Number);
      const meetingStartTime = new Date(meetingDate);
      meetingStartTime.setHours(meetingHour, meetingMinute, 0, 0);

      const meetingEndTime = new Date(meetingStartTime);
      meetingEndTime.setMinutes(
        meetingStartTime.getMinutes() + meeting.duration
      );

      // Check if the meeting overlaps with the time slot
      return meetingStartTime < slotEndTime && meetingEndTime > slotStartTime;
    });

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
