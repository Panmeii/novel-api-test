const express = require("express");
const {
  getLatestChapter,
  getFinishedNovels,
  getTrendingNovels,
  getMostViewedNovels,
  getNewestNovels,
  getMostRatedNovels,
  getAllNovels
} = require("../controllers/bacalightController");

const router = express.Router();

router.get("/bacalight/latest", getLatestChapter);
router.get("/bacalight/finished", getFinishedNovels);
router.get("/bacalight/trending", getTrendingNovels);
router.get("/bacalight/most-viewed", getMostViewedNovels);
router.get("/bacalight/newest", getNewestNovels);
router.get("/bacalight/most-rated", getMostRatedNovels);
router.get("/bacalight/all", getAllNovels);

module.exports = router;
