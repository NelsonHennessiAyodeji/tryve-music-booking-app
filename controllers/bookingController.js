const { NotFoundError, NotAcceptableError } = require("../errors");
const Booking = require("../models/Booking");
const { StatusCodes } = require("http-status-codes");

const getAllBookings = async (req, res) => {
  const bookings = await Booking.find({}).populate([
    { path: "event", select: "title -_id" },
    {
      path: "featuringArtists",
      select: "name -_id",
    },
  ]);

  if (!bookings) {
    throw new NotFoundError("There are no bookings at the moment");
  }

  res.status(StatusCodes.OK).json(bookings);
};

const getSingleBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findOne({ _id: id }).populate([
    { path: "event", select: "title -_id" },
    {
      path: "featuringArtists",
      select: "name -_id",
    },
  ]);

  if (!booking) {
    throw new NotFoundError(`Cannot find the booking with an ID of ${id}`);
  }

  res.status(StatusCodes.OK).json(booking);
};

const createBooking = async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    featuredArtist: req.artist.artistID,
  });

  if (!booking) {
    throw new NotAcceptableError(
      "Please provide a valid credentials to the fields"
    );
  }

  res.status(StatusCodes.CREATED).json(booking);
};

const updateBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true, runValidators: true }
  ).populate([
    { path: "event", select: "title -_id" },
    {
      path: "featuringArtists",
      select: "name -_id",
    },
  ]);

  if (!booking) {
    throw new NotFoundError(`Could not find the booking with an ID of ${id}`);
  }

  res.status(StatusCodes.ACCEPTED).json(booking);
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findOneAndDelete({ _id: id }).populate([
    { path: "event", select: "title -_id" },
    {
      path: "featuringArtists",
      select: "name -_id",
    },
  ]);

  if (!booking) {
    throw new NotFoundError(`Could not find the booking with an ID of ${id}`);
  }

  res.status(StatusCodes.ACCEPTED).json(booking);
};

module.exports = {
  getAllBookings,
  getSingleBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
