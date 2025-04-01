const { NotFoundError, NotAcceptableError } = require("../errors");
const Event = require("../models/Event");
const { StatusCodes } = require("http-status-codes");

const getAllEvents = async (req, res) => {
  const events = await Event.find({}).populate({
    path: "featuringArtists",
    select: "name -_id",
  });

  if (!events) {
    throw new NotFoundError("There are no events at the moment");
  }

  res.status(StatusCodes.OK).json(events);
};

const getSingleEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findOne({ _id: id }).populate({
    path: "featuringArtists",
    select: "name -_id",
  });

  if (!event) {
    throw new NotFoundError(`Cannot find the event with an ID of ${id}`);
  }

  res.status(StatusCodes.OK).json(event);
};

const createEvent = async (req, res) => {
  const event = await Event.create({
    ...req.body,
    featuredArtist: req.artist.artistID,
  });

  if (!event) {
    throw new NotAcceptableError(
      "Please provide a valid credentials to the fields"
    );
  }

  res.status(StatusCodes.CREATED).json(event);
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true, runValidators: true }
  ).populate({
    path: "featuringArtists",
    select: "name -_id",
  });

  if (!event) {
    throw new NotFoundError(`Could not find the event with an ID of ${id}`);
  }

  res.status(StatusCodes.ACCEPTED).json(event);
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findOneAndDelete({ _id: id }).populate({
    path: "featuringArtists",
    select: "name -_id",
  });

  if (!event) {
    throw new NotFoundError(`Could not find the event with an ID of ${id}`);
  }

  res.status(StatusCodes.ACCEPTED).json(event);
};

module.exports = {
  getAllEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
