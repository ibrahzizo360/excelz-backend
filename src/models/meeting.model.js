let meetings = [
  {
    date: "2024-12-22",
    time: "09:00",
    duration: 30,
    participants: ["Alice", "Bob"],
    title: "Standup Meeting",
    description: "Daily standup meeting to discuss progress and blockers.",
    location: "Conference Room A",
  },
  {
    date: "2024-12-22",
    time: "10:00",
    title: "Sprint Planning",
    duration: 90,
    participants: ["Team Alpha"],
    description: "Planning session for the upcoming project phase.",
    location: "Zoom",
  },
];

function getMeetings() {
  return meetings;
}

function addMeeting(meeting) {
  meetings.push(meeting);
}

function getMeetingById(meetingId) {
  return meetings.find((meeting) => meeting.id === meetingId);
}

function updateMeeting(meetingId, updatedMeeting) {
  const index = meetings.findIndex((meeting) => meeting.id === meetingId);
  if (index !== -1) {
    meetings[index] = { ...meetings[index], ...updatedMeeting };
  }
}

function deleteMeeting(meetingId) {
  meetings = meetings.filter((meeting) => meeting.id !== meetingId);
}

module.exports = {
  getMeetings,
  addMeeting,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};
