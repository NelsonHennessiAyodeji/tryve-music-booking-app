// Server Runner imports
const express = require("express");
const app = express();
const path = require("path");

// Server security and performance imports
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const hpp = require("hpp");
const compression = require("compression");
const cookieParser = require("cookie-parser");

// Router Imports
const baseUrl = "/api/v1/";
const authenticationRouter = require("./routers/authenticationRouter");
const artistRouter = require("./routers/artistRouter");
const eventRouter = require("./routers/eventRouter");
const bookingRouter = require("./routers/bookingRouter");

// Error Handler imports
const notFoundError = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// Server scurity and performance middleware implementation
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(compression());
app.use(cors());

// Server internal middleware
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json({ limit: "100kb" }));
app.use(express.static("public/documentation"));

// Server rate limiter
app.use(
  "/api",
  rateLimit({
    max: 200,
    windowsMs: 60 * 60 * 1000, // 1 Hour
    message: "Too many requests from this IP, please try again in an hour!",
  })
);

// Server routers
app.use(`/${baseUrl}/auth`, authenticationRouter);
app.use(`/${baseUrl}/artists`, artistRouter);
app.use(`/${baseUrl}/events`, eventRouter);
app.use(`/${baseUrl}/bookings`, bookingRouter);

// Server error handing implementations
app.use(notFoundError);
app.use(errorHandler);

module.exports = app;
