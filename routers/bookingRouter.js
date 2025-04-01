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
router.post("/", authenticateRouter, createBooking);
router.get("/:id", authenticateRouter, getSingleBooking);
router.patch("/:id", authenticateRouter, updateBooking);
router.delete("/:id", authenticateRouter, deleteBooking);

module.exports = router;
