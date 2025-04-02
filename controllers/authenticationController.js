const Artist = require("../models/Artist");
const {
  BadRequestError,
  NotAcceptableError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const { attachCookiesToResponse } = require("../utilities");
const { StatusCodes } = require("http-status-codes");
const { createToken } = require("../utilities/jwt");

const register = async (req, res) => {
  const { name, email, password, genre, bio, pricing, availability } = req.body;
  const artistAlreadyExists = await Artist.findOne({ email });

  // Check if the user exists using the unique email
  if (artistAlreadyExists) {
    throw new BadRequestError(
      "The email that you have provided has already been registered, please use a different one"
    );
  }

  // Create the Artist account
  const artist = await Artist.create({
    name,
    email,
    password,
    genre,
    bio,
    pricing,
    availability,
  });

  // If the artist account wasn't created properly, then user should check inputted values
  if (!artist) {
    throw new BadRequestError("Please provide a valid name/email/password");
  }

  // Compile the required Token
  const artistToken = {
    artistName: name,
    artistEmail: email,
    artistID: artist._id,
  };

  const token = createToken({ payload: artistToken }); // this is only here to expose it on the API Doc, it is not meant to be here

  // Attaching the important elements to make up the unique cookie
  attachCookiesToResponse(res, artistToken);

  // Attaching the quick user info on the response for easy access on the API interface or frontend
  res.status(StatusCodes.CREATED).json({
    message: "Success! You can proceed to logging in",
    Artist: {
      artistName: artist.name,
      artistEmail: artist.email,
      artistToken: token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Blank field check
  if (!email || !password) {
    throw new NotAcceptableError(
      "Can't accept blank fields, provide an email and a password to login"
    );
  }

  const artist = await Artist.findOne({ email });

  // Check if the email is registered
  if (!artist) {
    throw new NotFoundError(
      "The email that you have provided is not registered with us"
    );
  }

  // Compare passwords from the database level
  const passwordIsCorrect = await artist.comparePasswords(password);

  if (!passwordIsCorrect) {
    throw new UnauthenticatedError("Password is incorrect");
  }

  // Compile the required Token
  const artistToken = {
    artistName: artist.name,
    artistEmail: email,
    artistID: artist._id,
  };

  console.log(req.signedCookies);

  // Attaching the important elements to make up the unique cookie
  attachCookiesToResponse(res, artistToken);

  // Attaching the quick user info on the response for easy access on the API interface or frontend
  res.status(StatusCodes.OK).json({
    message: "Success! You have been logged in successfully",
    Artist: {
      artistName: artist.name,
      artistEmail: artist.email,
      artistToken: req.signedCookies,
    },
  });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res
    .status(StatusCodes.OK)
    .json("Success! You have been logged out successfully");
};

module.exports = { register, login, logout };
