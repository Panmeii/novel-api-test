const express = require("express");
const {
  getLatestChapter,
  
} = require("../controllers/bacalightController");

const router = express.Router();

router.get("/bacalight/latest", getLatestChapter);

module.exports = router;
