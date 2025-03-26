const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://bacalightnovel.co/";

/**
 * Scrape daftar novel terbaru (berdasarkan update)
 */
async function scrapeLatestRelease(page) {
    const url = `${BASE_URL}series/?page=${page}&status=&type=&order=update`;
    return await scrapeFromUpdatePage(url);
}

/**
 * Scrape daftar novel selesai (finished)
 */
async function scrapeFinishedNovels(page) {
    const url = `${BASE_URL}series/?page=${page}&status=completed&type=&order=update`;
    return await scrapeFromFinishedPage(url);
}

/**
 * Scrape daftar novel trending
 */
async function scrapeTrendingNovels(page) {
    const url = `${BASE_URL}series/?page=${page}&status=&type=&order=trending`;
    return await scrapeFromTrendingPage(url);
}

/**
 * Scrape daftar novel paling banyak dilihat
 */
async function scrapeMostViewedNovels(page) {
    const url = `${BASE_URL}series/?page=${page}&status=&type=&order=views`;
    return await scrapeFromMostViewedPage(url);
}

/**
 * Scrape daftar novel terbaru
 */
async function scrapeNewestNovels(page) {
    const url = `${BASE_URL}series/?page=${page}&status=&type=&order=newest`;
    return await scrapeFromNewestPage(url);
}

/**
 * Scrape daftar novel dengan rating tertinggi
 */
async function scrapeMostRatedNovels(page) {
    const url = `${BASE_URL}series/?page=${page}&status=&type=&order=rating`;
    return await scrapeFromMostRatedPage(url);
}

/**
 * Scrape semua novel berdasarkan abjad
 */
async function scrapeAllNovels(page) {
    const url = `${BASE_URL}series/?page=${page}&status=&type=&order=alphabet`;
    return await scrapeFromAlphabetPage(url);
}

/**
 * Scraper khusus untuk halaman "Latest Release"
 */
async function scrapeFromUpdatePage(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const novels = [];

        $(".inmain").each((_, element) => {
            const mdthumb = $(element).find(".mdthumb a");
            const mdinfo = $(element).find(".mdinfo");

            const novelUrl = mdthumb.attr("href") || "";
            const cover = mdthumb.find("img").attr("src") || "";
            const title = mdinfo.find("h2[itemprop='headline'] a").text().trim();
            const description = mdinfo.find(".contexcerpt p").text().trim();

            const genres = [];
            mdinfo.find(".mdgenre a").each((_, genre) => {
                genres.push($(genre).text().trim());
            });

            const rating = mdinfo.find(".mdminf i.fas.fa-star").parent().text().trim();
            const latestChapter = mdinfo.find(".nchapter a").text().trim();
            const latestChapterUrl = mdinfo.find(".nchapter a").attr("href") || "";

            novels.push({
                title,
                novelUrl,
                cover,
                description,
                genres,
                rating,
                latestChapter,
                latestChapterUrl,
            });
        });

        return novels;
    } catch (error) {
        console.error("Error scraping latest releases:", error.message);
        return [];
    }
}

/**
 * Scraper khusus untuk halaman "Finished Novels"
 */
async function scrapeFromFinishedPage(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const novels = [];

        $(".inmain").each((_, element) => {
            const title = $(element).find(".mdinfo h2 a").text().trim();
            const novelUrl = $(element).find(".mdinfo h2 a").attr("href");
            const cover = $(element).find(".mdthumb img").attr("src");
            const genres = $(element).find(".mdgenre a").map((_, el) => $(el).text()).get();
            const description = $(element).find(".contexcerpt p").text().trim();
            const rating = $(element).find(".mdminf i.fas.fa-star").parent().text().trim();

            novels.push({ title, novelUrl, cover, genres, description, rating });
        });

        return novels;
    } catch (error) {
        console.error("Error scraping finished novels:", error.message);
        return [];
    }
}

/**
 * Scraper khusus untuk halaman "Trending Novels"
 */
async function scrapeFromTrendingPage(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const novels = [];

        $(".trend-list-item").each((_, element) => {
            const title = $(element).find(".trend-title").text().trim();
            const novelUrl = $(element).find(".trend-title a").attr("href");
            const cover = $(element).find(".trend-thumb img").attr("src");
            const rating = $(element).find(".trend-rating").text().trim();

            novels.push({ title, novelUrl, cover, rating });
        });

        return novels;
    } catch (error) {
        console.error("Error scraping trending novels:", error.message);
        return [];
    }
}

/**
 * Scraper khusus untuk halaman "Most Viewed Novels"
 */
async function scrapeFromMostViewedPage(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const novels = [];

        $(".most-viewed-item").each((_, element) => {
            const title = $(element).find(".view-title").text().trim();
            const novelUrl = $(element).find(".view-title a").attr("href");
            const cover = $(element).find(".view-thumb img").attr("src");
            const views = $(element).find(".view-count").text().trim();

            novels.push({ title, novelUrl, cover, views });
        });

        return novels;
    } catch (error) {
        console.error("Error scraping most viewed novels:", error.message);
        return [];
    }
}

/**
 * Scraper untuk halaman "Newest, Most Rated, dan Alphabet"
 * (Gunakan pola yang mirip dengan fungsi lain jika HTML-nya berbeda)
 */
async function scrapeFromNewestPage(url) { /*...*/ }
async function scrapeFromMostRatedPage(url) { /*...*/ }
async function scrapeFromAlphabetPage(url) { /*...*/ }

// Export semua fungsi
module.exports = {
    scrapeLatestRelease,
    scrapeFinishedNovels,
    scrapeTrendingNovels,
    scrapeMostViewedNovels,
    scrapeNewestNovels,
    scrapeMostRatedNovels,
    scrapeAllNovels
};
