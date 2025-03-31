const CustomErrorAPI = require("./CustomErrorAPI");
const { StatusCodes } = require("http-status-codes");

class UnauthorizedError extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;
