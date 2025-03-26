const express = require("express");
const {
  getLatestChapter,
  getFinishedNovels,
  getTrendingNovels,
  getMostViewedNovels,
  getNewestNovels,
  getMostRatedNovels,
  getAllNovels
} = require("../controllers/fantranslationController");

const router = express.Router();

router.get("/fantranslation/latest", getLatestChapter);
router.get("/fantranslation/completed", getFinishedNovels);
router.get("/fantranslation/trending", getTrendingNovels);
router.get("/fantranslation/popular", getMostViewedNovels);
router.get("/fantranslation/newest", getNewestNovels);
router.get("/fantranslation/mostrated", getMostRatedNovels);
router.get("/fantranslation/all", getAllNovels);

module.exports = router;