const axios = require("axios");
const BASE_URL = "https://esnovels.com/data.json";

async function scrapeNewestUpdate() {
  try {
    const response = await axios.get(BASE_URL);
    const novels = response.data; // Access the `data` property of the Axios response

    if (!Array.isArray(novels)) {
      throw new Error("Expected an array but received something else.");
    }

    // Filter novels where `newUpdate` is "yes"
    const newNovels = novels.filter(novel => novel.newUpdate === "yes");
    return newNovels;
  } catch (error) {
    console.error("Error fetching or filtering data:", error.message);
    throw error;
  }
}
async function scrapeRecommended() {
  try {
    const response = await axios.get(BASE_URL);
    const novels = response.data; // Access the `data` property of the Axios response

    if (!Array.isArray(novels)) {
      throw new Error("Expected an array but received something else.");
    }

    // Filter novels where `newUpdate` is "yes"
    const newNovels = novels.filter(novel => novel.recommended === "yes");
    return newNovels;
  } catch (error) {
    console.error("Error fetching or filtering data:", error.message);
    throw error;
  }
}
async function scrapeFavourites() {
  try {
    const response = await axios.get(BASE_URL);
    const novels = response.data; // Access the `data` property of the Axios response

    if (!Array.isArray(novels)) {
      throw new Error("Expected an array but received something else.");
    }

    // Filter novels where `newUpdate` is "yes"
    const newNovels = novels.filter(novel => novel.addToFav === "yes");
    return newNovels;
  } catch (error) {
    console.error("Error fetching or filtering data:", error.message);
    throw error;
  }
}
async function scrapeInfo(id) {
  try {
    const response = await axios.get(BASE_URL);
    const novels = response.data; // Access the `data` property of the Axios response

    if (!Array.isArray(novels)) {
      throw new Error("Expected an array but received something else.");
    }

    // Filter novels where `newUpdate` is "yes"
    const newNovels = novels.find(novel => novel.id === id);
    return newNovels;
  } catch (error) {
    console.error("Error fetching or filtering data:", error.message);
    throw error;
  }
}
async function scrapeSearch(query) {
  try {
    const response = await axios.get(BASE_URL);
    const novels = response.data; // Access the `data` property of the Axios response

    if (!Array.isArray(novels)) {
      throw new Error("Expected an array but received something else.");
    }

    // Normalize the query by converting it to lowercase and removing special characters
    const normalizedQuery = query
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, "")
      .trim();

    // Filter novels where the normalized title matches the normalized query
    const filteredNovels = novels.filter(novel => {
      const normalizedTitle = novel.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/gi, "") // Remove special characters
        .trim();
      return normalizedTitle.includes(normalizedQuery);
    });

    return filteredNovels;
  } catch (error) {
    console.error("Error fetching or filtering data:", error.message);
    throw error;
  }
}

module.exports = {
  scrapeNewestUpdate,
  scrapeRecommended,
  scrapeFavourites,
  scrapeInfo,
  scrapeSearch,
};