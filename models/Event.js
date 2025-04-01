const mongoose = require("mongoose");
const Booking = require("./Booking");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of the event"],
      minLength: 5,
      maxLength: 50,
    },
    date: {
      type: Date,
      required: [true, "Please provide a date for your event"],
    },
    location: {
      type: String,
      required: [true, "Please provide the location to your event"],
      minLength: 5,
      maxLength: 50,
    },
    description: { type: String, minLength: 20, maxLength: 200 },
    featuringArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }], // Multiple artists can be selected
    status: {
      type: String,
      enum: ["upcoming", "Done", "cancelled"],
      default: "upcoming",
    },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  },
  { timestamps: true }
);

// This Mongo function allows us to perform logic before the schema saves after being modified/created
EventSchema.pre("save", async function () {
  // Populate the bookings automatically
  if (this.$isEmpty("booking")) {
    this.booking = await Booking.create({
      event: this._id,
      featuringArtists: this.featuringArtists,
    });
  }
});

// If the event ends up being deleted, let all associating bookings be deleted with it
EventSchema.pre(
  "findOneAndDelete",
  { document: true, query: false },
  async function (next) {
    await this.model("Booking").deleteMany({ event: this._id });
  }
);

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
