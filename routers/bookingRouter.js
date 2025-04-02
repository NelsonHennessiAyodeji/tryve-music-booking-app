const express = require("express");
const router = express.Router();
const authenticateRouter = require("../middlewares/authentication");
const {
  createBooking,
  deleteBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
} = require("../controllers/bookingController");

router.get("/", authenticateRouter, getAllBookings);
router.post("/createBooking", authenticateRouter, createBooking);
router.get("/:id", authenticateRouter, getSingleBooking);
router.patch("/updateBooking/:id", authenticateRouter, updateBooking);
router.delete("deleteBooking/:id", authenticateRouter, deleteBooking);

module.exports = router;
