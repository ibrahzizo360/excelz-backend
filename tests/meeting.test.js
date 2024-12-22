const request = require("supertest");
const app = require("../src/app");
const { getMeetings, addMeeting } = require("../src/models/meetingModel");

describe("Meeting API", () => {
  beforeEach(() => {
    // Clear meetings before each test
    getMeetings().length = 0;
  });

  test("POST /api/meetings should create a new meeting", async () => {
    const meetingData = {
      date: "2024-12-25",
      time: "10:00 AM",
      duration: "1 hour",
      participants: ["client1", "freelancer1"],
    };

    const response = await request(app).post("/api/meetings").send(meetingData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.date).toBe(meetingData.date);
  });

  test("GET /api/meetings should retrieve all meetings", async () => {
    addMeeting({
      date: "2024-12-25",
      time: "10:00 AM",
      duration: "1 hour",
      participants: ["client1", "freelancer1"],
    });

    const response = await request(app).get("/api/meetings");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("PUT /api/meetings/:id should update a meeting", async () => {
    const meeting = {
      date: "2024-12-25",
      time: "10:00 AM",
      duration: "1 hour",
      participants: ["client1", "freelancer1"],
    };
    const newMeeting = await request(app).post("/api/meetings").send(meeting);
    const meetingId = newMeeting.body.id;

    const updatedData = {
      date: "2024-12-26",
      time: "11:00 AM",
      duration: "1 hour",
      participants: ["client1", "freelancer2"],
    };
    const response = await request(app)
      .put(`/api/meetings/${meetingId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.date).toBe(updatedData.date);
  });

  test("DELETE /api/meetings/:id should delete a meeting", async () => {
    const meeting = {
      date: "2024-12-25",
      time: "10:00 AM",
      duration: "1 hour",
      participants: ["client1", "freelancer1"],
    };
    const newMeeting = await request(app).post("/api/meetings").send(meeting);
    const meetingId = newMeeting.body.id;

    const response = await request(app).delete(`/api/meetings/${meetingId}`);

    expect(response.status).toBe(204);
  });
});
