const {
  scrapeNewestUpdate,
  scrapeRecommended,
  scrapeFavourites,
  scrapeInfo,
  scrapeSearch
} = require("../scrapper/esnovelsScrapper");

async function getNewest(req, res) {
  try {
    // Fetch all filtered data
    const novels = await scrapeNewestUpdate();

    const reformNovels = novels.map(novel => ({
      id: novel.id,
      title: novel.title,
      cover: novel.cover,
      status: novel.status,
      type: novel.type,
      genres: novel.genre
        ? novel.genre.split(",").map(genre => genre.trim())
        : [],
      synopsis: novel.synopsis
    }));
    // Get page and perPage from query parameters with defaults
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const perPage = parseInt(req.query.perPage) || 10; // Default to 10 items per page

    // Calculate start and end indexes for slicing
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    // Slice the array to get paginated results
    const paginatedNovels = reformNovels.slice(startIndex, endIndex);

    // Return the paginated data along with metadata
    return res.status(200).send({
      success: true,
      source: "https://esnovels.com/",
      total: novels.length,
      page: page,
      perPage: perPage,
      data: paginatedNovels
    });
  } catch (err) {
    console.error("Error in getNewest:", err.message);
    return res.status(500).send({
      success: false,
      source: "https://esnovels.com/",
      message: "Failed to fetch data from EsNovels!"
    });
  }
}
async function getRecommended(req, res) {
  try {
    // Fetch all filtered data
    const novels = await scrapeRecommended();

    const reformNovels = novels.map(novel => ({
      id: novel.id,
      title: novel.title,
      cover: novel.cover,
      status: novel.status,
      type: novel.type,
      genres: novel.genre
        ? novel.genre.split(",").map(genre => genre.trim())
        : [],
      synopsis: novel.synopsis
    }));
    // Get page and perPage from query parameters with defaults
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const perPage = parseInt(req.query.perPage) || 10; // Default to 10 items per page

    // Calculate start and end indexes for slicing
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    // Slice the array to get paginated results
    const paginatedNovels = reformNovels.slice(startIndex, endIndex);

    // Return the paginated data along with metadata
    return res.status(200).send({
      success: true,
      source: "https://esnovels.com/",
      total: novels.length,
      page: page,
      perPage: perPage,
      data: paginatedNovels
    });
  } catch (err) {
    console.error("Error in getNewest:", err.message);
    return res.status(500).send({
      success: false,
      source: "https://esnovels.com/",
      message: "Failed to fetch data from EsNovels!"
    });
  }
}
async function getFavourites(req, res) {
  try {
    // Fetch all filtered data
    const novels = await scrapeFavourites();

    const reformNovels = novels.map(novel => ({
      id: novel.id,
      title: novel.title,
      cover: novel.cover,
      status: novel.status,
      type: novel.type,
      genres: novel.genre
        ? novel.genre.split(",").map(genre => genre.trim())
        : [],
      synopsis: novel.synopsis
    }));
    // Get page and perPage from query parameters with defaults
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const perPage = parseInt(req.query.perPage) || 10; // Default to 10 items per page

    // Calculate start and end indexes for slicing
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    // Slice the array to get paginated results
    const paginatedNovels = reformNovels.slice(startIndex, endIndex);

    // Return the paginated data along with metadata
    return res.status(200).send({
      success: true,
      source: "https://esnovels.com/",
      total: novels.length,
      page: page,
      perPage: perPage,
      data: paginatedNovels
    });
  } catch (err) {
    console.error("Error in getNewest:", err.message);
    return res.status(500).send({
      success: false,
      source: "https://esnovels.com/",
      message: "Failed to fetch data from EsNovels!"
    });
  }
}
async function getNovelInfo(req, res) {
  const id = req.query.id;

  // Validate id
  if (!id || id.trim() === "") {
    return res.status(400).send({
      success: false,
      message: "Id is required and must not be empty."
    });
  }

  try {
    // Fetch the novel info by id
    const novel = await scrapeInfo(id); // Assuming scrapeInfo is modified to return a single novel

    if (!novel) {
      return res.status(404).send({
        success: false,
        message: `No novel found with id: ${id}`
      });
    }

    const reformNovel = {
      id: novel.id,
      title: novel.title,
      alternative: novel.alternative || "No alternative title available",
      cover: novel.cover || "No cover available",
      status: novel.status || "Unknown status",
      type: novel.type || "Unknown type",
      genres: novel.genre ? novel.genre.split(",").map(genre => genre.trim()) : [],
      synopsis: novel.synopsis || "No synopsis available",
      author: novel.authors || "Unknown author",
      artist: novel.artist || "Unknown artist",
      publisher: novel.publisher || "Unknown publisher",
      translation: novel.translationGroup || "Unknown translation group",
      totalVolumes: novel.volumesCount || "Not specified",
      volumes: novel.volumes || [],
    };

    return res.status(200).send({
      success: true,
      source: "https://esnovels.com/",
      data: reformNovel
    });
  } catch (err) {
    console.error("Error in getNovelInfo:", err.message);
    return res.status(500).send({
      success: false,
      source: "https://esnovels.com/",
      message: "Failed to fetch data from EsNovels!"
    });
  }
}
async function getSearchQuery(req, res) {
  const query = req.query.query || "Hero";

  if (!query.trim()) {
    return res.status(400).send({
      success: false,
      message: "Query cannot be empty."
    });
  }

  try {
    // Fetch all filtered data
    const novels = await scrapeSearch(query);

    // Transform the data
    const reformNovels = novels.map(novel => ({
      id: novel.id,
      title: novel.title,
      cover: novel.cover,
      status: novel.status,
      type: novel.type,
      genres: novel.genre
        ? novel.genre.split(",").map(genre => genre.trim())
        : [],
      synopsis: novel.synopsis || "Synopsis not available"
    }));

    // Get page and perPage from query parameters with defaults
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const perPage = parseInt(req.query.perPage) || 10; // Default to 10 items per page

    // Calculate start and end indexes for slicing
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    // Slice the array to get paginated results
    const paginatedNovels = reformNovels.slice(startIndex, endIndex);

    // Return the paginated data along with metadata
    return res.status(200).send({
      success: true,
      source: "https://esnovels.com/",
      total: reformNovels.length, // Total after filtering
      page: page,
      perPage: perPage,
      data: paginatedNovels
    });
  } catch (err) {
    console.error("Error in getSearchQuery:", err.message);
    return res.status(500).send({
      success: false,
      source: "https://esnovels.com/",
      message: "Failed to fetch data from EsNovels!"
    });
  }
}

module.exports = {
  getNewest,
  getRecommended,
  getFavourites,
  getNovelInfo,
  getSearchQuery
};
