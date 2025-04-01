const { StatusCodes } = require("http-status-codes");
const CustomErrorAPI = require("../errors/CustomErrorAPI");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, err: err.stack });
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message, err: err.stack });
};

module.exports = errorHandler;
