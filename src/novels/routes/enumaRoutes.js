const express = require("express");
const {
  getLatestNovels
} = require("../controllers/enumaController");

const router = express.Router();

router.get("/enuma/latest", getLatestNovels);

module.exports = router;
