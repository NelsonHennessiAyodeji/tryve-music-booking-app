const Artist = require("../models/Artist");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { name, email, password, genre, bio, pricing, availability } = req.body;
  const artist = await Artist.create({
    name,
    email,
    password,
    genre,
    bio,
    pricing,
    availability,
  });

  res.status(StatusCodes.CREATED).json({ Artist: artist });
};

module.exports = register;
