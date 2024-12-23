const {
  createUser,
  fetchUsers,
  fetchAvailableTimeSlots,
} = require("../../controllers/user.controller");
const { addUser, getUsers } = require("../../models/user.model");
const { getMeetings } = require("../../models/meeting.model");

jest.mock("../../models/user.model");
jest.mock("../../models/meeting.model");

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a new user and return a 201 status", () => {
      const mockReq = {
        body: {
          id: "3",
          name: "Jane",
          email: "jane@example.com",
          role: "client",
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      createUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockReq.body);
      expect(addUser).toHaveBeenCalledWith(mockReq.body);
    });

    it("should return a 400 status if required fields are missing", () => {
      const mockReq = {
        body: { name: "Jane" },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      createUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith(
        "Missing required user details"
      );
      expect(addUser).not.toHaveBeenCalled();
    });
  });

  describe("fetchUsers", () => {
    it("should fetch all users and return a 200 status", () => {
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

      const mockReq = {};
      const mockRes = {
        json: jest.fn(),
      };

      fetchUsers(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
      expect(getUsers).toHaveBeenCalled();
    });
  });

  describe("fetchAvailableTimeSlots", () => {
    it("should fetch available time slots for a user", () => {
      const mockMeetings = [
        {
          id: "1",
          date: "2024-12-22",
          time: "09:00",
          duration: 60,
          participants: ["1"],
        },
        {
          id: "2",
          date: "2024-12-22",
          time: "10:00",
          duration: 90,
          participants: ["1"],
        },
      ];
      getMeetings.mockReturnValue(mockMeetings);

      const mockReq = {
        params: { userId: "1" },
        query: { date: "2024-12-22" },
      };
      const mockRes = {
        json: jest.fn(),
      };

      const expectedSlots = [
        "12:00 - 13:00",
        "13:00 - 14:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
        "16:00 - 17:00",
      ];

      fetchAvailableTimeSlots(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        userId: "1",
        availableTimeSlots: expectedSlots,
      });
      expect(getMeetings).toHaveBeenCalled();
    });

    it("should return an empty array if no slots are available", () => {
      const mockMeetings = [
        {
          id: "1",
          date: "2024-12-22",
          time: "09:00",
          duration: 60,
          participants: ["1"],
        },
        {
          id: "2",
          date: "2024-12-22",
          time: "10:00",
          duration: 90,
          participants: ["1"],
        },
      ];
      getMeetings.mockReturnValue(mockMeetings);

      const mockReq = {
        params: { userId: "1" },
        query: { date: "2024-12-22" },
      };
      const mockRes = {
        json: jest.fn(),
      };

      fetchAvailableTimeSlots(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        userId: "1",
        availableTimeSlots: [],
      });
      expect(getMeetings).toHaveBeenCalled();
    });
  });
});
