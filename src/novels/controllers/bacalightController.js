const {
  scrapeLatestRelease,
  scrapeFinishedNovels,
  scrapeTrendingNovels,
  scrapeMostViewedNovels,
  scrapeNewestNovels,
  scrapeMostRatedNovels,
  scrapeAllNovels
} = require("../scrapper/bacalightScrapper");

/**
 * Helper untuk menangani request scraping
 */
async function handleScraping(req, res, scrapeFunction, categoryName) {
  const page = req.query.page || 1;
  try {
    const data = await scrapeFunction(page);
    if (data.length > 0) {
      return res.status(200).json({ success: true, page, data });
    } else {
      return res.status(404).json({ success: false, message: `No ${categoryName} found!` });
    }
  } catch (error) {
    console.error(`Failed to fetch ${categoryName} from bacalightnovel.co:`, error.message);
    return res.status(500).json({ success: false, message: `Failed to fetch ${categoryName}!` });
  }
}

// Definisi fungsi controller
async function getLatestChapter(req, res) {
  return handleScraping(req, res, scrapeLatestRelease, "latest chapters");
}
async function getFinishedNovels(req, res) {
  return handleScraping(req, res, scrapeFinishedNovels, "finished novels");
}
async function getTrendingNovels(req, res) {
  return handleScraping(req, res, scrapeTrendingNovels, "trending novels");
}
async function getMostViewedNovels(req, res) {
  return handleScraping(req, res, scrapeMostViewedNovels, "most viewed novels");
}
async function getNewestNovels(req, res) {
  return handleScraping(req, res, scrapeNewestNovels, "newest novels");
}
async function getMostRatedNovels(req, res) {
  return handleScraping(req, res, scrapeMostRatedNovels, "most rated novels");
}
async function getAllNovels(req, res) {
  return handleScraping(req, res, scrapeAllNovels, "all novels");
}

// Ekspor semua fungsi
module.exports = {
  getLatestChapter,
  getFinishedNovels,
  getTrendingNovels,
  getMostViewedNovels,
  getNewestNovels,
  getMostRatedNovels,
  getAllNovels
};
