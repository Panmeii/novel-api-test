const express = require("express");
const {
  getLatestNovels
} = require("../controllers/bacalightController");

const router = express.Router();

router.get("/bacalight/latest", getLatestNovels);

module.exports = router;
