const {
  addMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
} = require("../../models/meeting.model");

describe("Meeting Model", () => {
  test("should add a meeting successfully", () => {
    const newMeeting = {
      id: "3",
      date: "2024-12-23",
      time: "11:00",
      duration: 30,
      participants: ["1"],
      title: "Review",
    };
    addMeeting(newMeeting);
    expect(getMeetings()).toContainEqual(newMeeting);
  });

  test("should fetch meeting by ID", () => {
    const meeting = getMeetingById("1");
    expect(meeting).toHaveProperty("id", "1");
  });

  test("should update a meeting successfully", () => {
    const updatedMeeting = { title: "Updated Title" };
    updateMeeting("1", updatedMeeting);
    const meeting = getMeetingById("1");
    expect(meeting.title).toBe("Updated Title");
  });

  test("should delete a meeting successfully", () => {
    deleteMeeting("2");
    expect(getMeetings().some((meeting) => meeting.id === "2")).toBe(false);
  });
});
