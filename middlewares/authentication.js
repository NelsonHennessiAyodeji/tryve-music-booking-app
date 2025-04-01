const { UnauthenticatedError } = require("../errors");
const { verifyToken } = require("../utilities");

// This middleware funtion checks for a cookie to know if the artist has been aithenticated or not
const authenticateArtist = (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new UnauthenticatedError("Invalid token, please register or log in");
  }

  // Because if I verify the token, it would give me the information i used to encode the toke in the first place
  const { artistName, artistEmail, artistID } = verifyToken(token);

  req.artist = { artistName, artistEmail, artistID };
  next();
};

module.exports = authenticateArtist;
