const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://enuma.id/";

/**
 * Scrape daftar novel terbaru dari enuma.id
 */
async function scrapeLatestRelease(page = 1, status = "", type = "", order = "update") {
    const url = `${BASE_URL}series/?page=${page}&status=${status}&type=${type}&order=${order}`;
    console.log(`Fetching data from: ${url}`);

    try {
        // Gunakan headers agar request terlihat seperti browser
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
                "Referer": BASE_URL,
            },
        });

        const $ = cheerio.load(data);
        const novels = [];

        $(".bs").each((_, element) => {
            const novelElement = $(element);

            // Mendapatkan URL novel
            const novelUrl = novelElement.find(".headline a").attr("href") || "";

            // Mendapatkan cover novel (gunakan data-src jika ada)
            const cover = novelElement.find(".mdthumb a img").attr("data-src") || novelElement.find(".bsx img").attr("src") || "";

            // Mendapatkan judul novel
            const title = novelElement.find(".mdinfo h2").text().trim();

            // Mendapatkan genre (bentuk array)
            const genres = [];
            novelElement.find(".mdgenre a").each((_, genre) => {
                genres.push($(genre).text().trim());
            });

            // Mendapatkan rating
            const rating = novelElement.find(".rating i.fa-star").parent().text().trim();

            // Mendapatkan chapter terbaru
            const latestChapter = novelElement.find(".eps a").text().trim();
            const latestChapterUrl = novelElement.find(".eps a").attr("href") || "";

            novels.push({
                title,
                novelUrl,
                cover,
                genres,
                rating,
                latestChapter,
                latestChapterUrl,
            });
        });

        if (novels.length === 0) {
            console.warn("Warning: No novels found. Check HTML structure.");
        }

        return novels;
    } catch (error) {
        console.error("Error scraping latest releases:", error.message);
        return [];
    }
}

/
module.exports = { scrapeLatestRelease };
