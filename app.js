const express = require("express");
const app = express();
const baseUrl = "api/v1/tryve-music";
const artistRouter = require("./routers/artistRouter");
const authenticationRouter = require("./routers/authenticationRouter");

app.use(express.json());
app.use(`/${baseUrl}/artists`, artistRouter);
app.use(`/${baseUrl}/register`, authenticationRouter);

module.exports = app;
