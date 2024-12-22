let meetings = [];

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
