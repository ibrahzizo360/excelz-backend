const {
  createMeeting,
  fetchMeetings,
  updateMeeting,
  deleteMeeting,
} = require("../../controllers/meeting.controller");
const { getMeetings, addMeeting } = require("../../models/meeting.model");

jest.mock("../../models/meeting.model"); // Mock the model

describe("Meeting Controller", () => {
  let meetings = []; // Initialize an array to hold the meetings

  beforeEach(() => {
    // Reset meetings before each test
    meetings = [];
    getMeetings.mockReturnValue(meetings); // Mock getMeetings to return the meetings array
  });

  test("should create a meeting", () => {
    const req = {
      body: {
        id: "3",
        date: "2024-12-23",
        time: "14:00",
        duration: 60,
        participants: ["1"],
        title: "Test Meeting",
        location: "Conference Room",
        description: "Test description", // Ensure all required fields are included
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(), // Mock send
    };

    // Mock addMeeting to push the new meeting into the meetings array
    addMeeting.mockImplementation((meeting) => {
      meetings.push(meeting);
    });

    createMeeting(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
    expect(meetings.some((meeting) => meeting.id === "3")).toBe(true);
  });

  test("should fetch meetings", () => {
    const req = {};
    const res = { json: jest.fn() };
    fetchMeetings(req, res);
    expect(res.json).toHaveBeenCalledWith(meetings);
  });
});
