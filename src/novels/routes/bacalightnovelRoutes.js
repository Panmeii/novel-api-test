const express = require("express");
const {
  getLatestChapter,
} = require("../controllers/bacalightnovelController");

const router = express.Router();

router.get("/bacalightnovel/latest", getLatestChapter);

module.exports = router;
