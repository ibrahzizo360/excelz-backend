let users = [
  { id: "1", name: "Fred", email: "fred@example.com", role: "freelancer" },
  { id: "2", name: "Clinton", email: "clinton@example.com", role: "client" },
];

function getUsers() {
  return users;
}

function addUser(user) {
  users.push(user);
}

module.exports = {
  getUsers,
  addUser,
};
