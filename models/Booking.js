const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Please provide an event for this booking"],
    },
    featuringArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: [true, "Please provide at least one artist for this booking"],
      },
    ],
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who made the booking
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
