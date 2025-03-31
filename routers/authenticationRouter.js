const express = require("express");
const router = express.Router();
const register = require("../controllers/authenticationController");

router.post("/", register);

module.exports = router;
