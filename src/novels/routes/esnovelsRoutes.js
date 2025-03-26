const express = require("express");
const {
  getNewest,
  getRecommended,
  getFavourites,
  getNovelInfo,
  getSearchQuery
} = require("../controllers/esnovelsController");

const router = express.Router();

// Define the route for the newest novels
router.get("/esnovels/latest", getNewest);
router.get("/esnovels/recommended", getRecommended);
router.get("/esnovels/favourites", getFavourites);
router.get("/esnovels/info", getNovelInfo);
router.get("/esnovels/search", getSearchQuery);

module.exports = router;
