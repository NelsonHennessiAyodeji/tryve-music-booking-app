const express = require("express");
const router = express.Router();
const authenticateRouter = require("../middlewares/authentication");
const {
  getAllEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.get("/", authenticateRouter, getAllEvents);
router.post("/createEvent", authenticateRouter, createEvent);
router.get("/:id", authenticateRouter, getSingleEvent);
router.patch("/updateEvent/:id", authenticateRouter, updateEvent);
router.delete("/deleteEvent/:id", authenticateRouter, deleteEvent);

module.exports = router;
