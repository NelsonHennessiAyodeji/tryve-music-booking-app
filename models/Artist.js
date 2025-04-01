const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ArtistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: 3,
      maxLength: 36,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      minLength: 11,
      maxLength: 50,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 6,
    },
    genre: {
      type: String,
      default: "Afropop",
    },
    bio: {
      type: String,
      minLength: 6,
      maxLength: 150,
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

// This Mongo function allows us to perform logic before the schema saves after being modified/created
ArtistSchema.pre("save", async function () {
  // If the password filed was modified, always create a hash
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// Checking the password provided by the user in the login stage is correct
ArtistSchema.methods.comparePasswords = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = Artist;
