const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const baseUrl = "api/v1/tryve-music";
const authenticationRouter = require("./routers/authenticationRouter");
const artistRouter = require("./routers/artistRouter");
const eventRouter = require("./routers/eventRouter");
const bookingRouter = require("./routers/bookingRouter");
const notFoundError = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(`/${baseUrl}/auth`, authenticationRouter);
app.use(`/${baseUrl}/artists`, artistRouter);
app.use(`/${baseUrl}/events`, eventRouter);
app.use(`/${baseUrl}/bookings`, bookingRouter);
app.use(notFoundError);
app.use(errorHandler);

module.exports = app;
