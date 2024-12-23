const { addUser, getUsers } = require("../../models/user.model");

describe("User Model", () => {
  test("should add a user successfully", () => {
    const newUser = {
      id: "3",
      name: "John Doe",
      email: "john@example.com",
      role: "client",
    };
    addUser(newUser);
    expect(getUsers()).toContainEqual(newUser);
  });

  test("should fetch all users", () => {
    const users = getUsers();
    expect(users.length).toBeGreaterThan(0);
  });
});
