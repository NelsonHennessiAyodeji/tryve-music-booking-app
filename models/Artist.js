const { string, required } = require("joi");
const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 36,
      required: true,
    },
    email: {
      type: String,
      min: 14,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    genre: {
      type: String,
      default: "Afropop",
    },
    bio: {
      type: String,
      min: 6,
      max: 150,
    },
    pricing: {
      type: Number,
      default: 100000,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = Artist;
