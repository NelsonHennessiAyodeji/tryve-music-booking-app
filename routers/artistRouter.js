const express = require("express");
const router = express.Router();
const authenticateRouter = require("../middlewares/authentication");
const {
  getAllArtists,
  updateArtist,
  getSingleArtist,
  updateArtistPassword,
} = require("../controllers/artistController");

router.get("/", authenticateRouter, getAllArtists);
router.put("/", authenticateRouter, updateArtist);
router.patch("/updatePassword", authenticateRouter, updateArtistPassword);
router.get("/:id", authenticateRouter, getSingleArtist);

module.exports = router;
