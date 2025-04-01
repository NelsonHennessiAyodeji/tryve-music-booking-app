const { NotFoundError, BadRequestError } = require("../errors");
const Artist = require("../models/Artist");
const { StatusCodes } = require("http-status-codes");

const getAllArtists = async (req, res) => {
  const artists = await Artist.find({}).select("-password");

  if (!artists) {
    throw new NotFoundError("There are no artists registered at the moment");
  }

  res.status(StatusCodes.OK).json({ artists });
};

const getSingleArtist = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findOne({ _id: id }).select("-password");

  if (!artist) {
    throw new NotFoundError("The artist was not found");
  }

  res.status(StatusCodes.OK).json({ artist });
};

const updateArtist = async (req, res) => {
  const { name, email, genre, bio, pricing, availability } = req.body;
  const { artistID } = req.artist;

  const updatedArtist = await Artist.findOneAndUpdate(
    { _id: artistID },
    { ...req.body },
    { runValidators: true, new: true }
  );

  if (!updatedArtist) {
    throw new Error("Something went wrong with the server, please try again");
  }

  res.status(StatusCodes.ACCEPTED).json(updatedArtist);
};

const updateArtistPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { artistID } = req.artist;
  const artist = await Artist.findOne({ _id: artistID });

  if (!oldPassword || !newPassword) {
    throw new BadRequestError(
      "Please provide your old password and a new password"
    );
  }

  const isPasswordCorrect = await artist.comparePasswords(oldPassword);

  if (!isPasswordCorrect) {
    throw new BadRequestError("Your old password is incorrect");
  }

  if (oldPassword === newPassword) {
    throw new BadRequestError("Your old and new password are matching");
  }

  artist.password = newPassword;
  await artist.save();

  res.status(StatusCodes.OK).json("Your password was successfully changed");
};

// const deleteArtist = async (req, res) => {
//   const { artistID: id } = req.artist;
//   const deletedArtist = await Artist.findOneAndDelete({ _id: id });

//   if (!deletedArtist) {
//     throw new Error("Something went wrong with the server, please try again");
//   }

// res.cookie("token", "logout", {
//   httpOnly: true,
//   expires: new Date(Date.now())
// });
// res.status(StatusCodes.OK).json("logged out");

//   res.status(StatusCodes.OK).json(deletedArtist);
// };

module.exports = {
  getAllArtists,
  getSingleArtist,
  updateArtist,
  updateArtistPassword,
};
