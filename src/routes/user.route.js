const express = require("express");
const {
  createUser,
  fetchUsers,
  fetchAvailableTimeSlots,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/users", createUser);
router.get("/users", fetchUsers);
router.get("/users/:id/available-slots", fetchAvailableTimeSlots);

module.exports = router;
