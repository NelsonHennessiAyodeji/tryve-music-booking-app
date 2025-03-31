const Artist = require("../models/Artist");
const { StatusCodes } = require("http-status-codes");

const getAllArtists = async (req, res) => {
  res.send("ALL ARTISTS LIST");
};

module.exports = getAllArtists;
