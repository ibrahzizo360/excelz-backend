const { app, server } = require("../../app");
const request = require("supertest");

describe("Meetings Routes", () => {
  test("should create a meeting", async () => {
    const newMeeting = {
      id: "4",
      date: "2024-12-24",
      time: "15:00",
      duration: 30,
      participants: ["1"],
      title: "Functional Test",
    };
    const res = await request(app).post("/meetings").send(newMeeting);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newMeeting);
  });

  test("should fetch all meetings", async () => {
    const res = await request(app).get("/meetings");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

afterAll(() => {
  server.close();
});
