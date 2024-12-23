const request = require("supertest");
const { app, server } = require("../../app");
const { addUser, getUsers } = require("../../models/user.model");

jest.mock("../../models/user.model");

describe("User Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const newUser = {
        id: "3",
        name: "Jane",
        email: "jane@example.com",
        role: "client",
      };

      const response = await request(app).post("/api/users").send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newUser);
      expect(addUser).toHaveBeenCalledWith(newUser);
    });

    it("should return 400 if required fields are missing", async () => {
      const incompleteUser = { name: "Jane" };

      const response = await request(app)
        .post("/api/users")
        .send(incompleteUser);

      expect(response.status).toBe(400);
      expect(response.text).toBe("Missing required user details");
      expect(addUser).not.toHaveBeenCalled();
    });
  });

  describe("GET /api/users", () => {
    it("should fetch all users", async () => {
      const mockUsers = [
        {
          id: "1",
          name: "Fred",
          email: "fred@example.com",
          role: "freelancer",
        },
        {
          id: "2",
          name: "Clinton",
          email: "clinton@example.com",
          role: "client",
        },
      ];
      getUsers.mockReturnValue(mockUsers);

      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
      expect(getUsers).toHaveBeenCalled();
    });
  });

  describe("GET /api/users/:userId/available-slots", () => {
    it("should fetch available time slots for a user", async () => {
      const mockMeetings = [
        {
          id: "1",
          date: "2024-12-22",
          time: "09:00",
          duration: 30,
          participants: ["1", "2"],
        },
      ];
      const mockUserId = "1";
      const mockDate = "2024-12-22";

      const expectedSlots = ["10:00 - 11:00", "11:00 - 12:00"]; // Adjust based on the logic in your code
      const response = await request(app).get(
        `/api/users/${mockUserId}/available-slots?date=${mockDate}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("userId", mockUserId);
      expect(response.body.availableTimeSlots).toEqual(expectedSlots);
    });

    it("should return an empty array if no slots are available", async () => {
      const mockUserId = "1";
      const mockDate = "2024-12-22";

      const response = await request(app).get(
        `/api/users/${mockUserId}/available-slots?date=${mockDate}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("userId", mockUserId);
      expect(response.body.availableTimeSlots).toEqual([]);
    });
  });
});

afterAll(() => {
  server.close();
});
