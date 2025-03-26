const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://bacalightnovel.co/";

/**
 * Scrape daftar novel terbaru dengan filter query
 */
async function scrapeLatestRelease(page = 1, status = "", type = "", order = "update") {
    const url = `${BASE_URL}series/?page=${page}&status=${status}&type=${type}&order=${order}`;
    console.log(`Fetching data from: ${url}`);

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

            // Mengambil genre dalam bentuk array
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

module.exports = { scrapeLatestRelease };
