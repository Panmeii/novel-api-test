const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://enuma.id/";

/**
 * Scrape daftar novel terbaru dari Enuma.id
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

        $(".inmain").each((_, element) => {
            const mdthumb = $(element).find(".mdthumb a");
            const mdinfo = $(element).find(".mdinfo");

            // Ambil URL novel
            const novelUrl = mdthumb.attr("href") || "";

            // Ambil cover (gunakan data-src karena lazy-load)
            const cover = mdthumb.find("img").attr("data-src") || mdthumb.find("img").attr("src") || "";

            // Ambil judul novel
            const title = mdinfo.find("h2[itemprop='headline'] a").text().trim();

            // Ambil deskripsi novel
            const description = mdinfo.find(".contexcerpt p").text().trim();

            // Ambil genre dalam bentuk array
            const genres = [];
            mdinfo.find(".mdgenre a").each((_, genre) => {
                genres.push($(genre).text().trim());
            });

            // Ambil rating
            const rating = mdinfo.find(".mdminf i.fas.fa-star").parent().text().trim();

            // Ambil chapter terbaru
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

        if (novels.length === 0) {
            console.warn("Warning: No novels found. Periksa apakah struktur HTML berubah.");
        }

        return novels;
    } catch (error) {
        console.error("Error scraping latest releases:", error.message);
        return [];
    }
}

// Contoh pemanggilan fungsi
scrapeLatestRelease(1).then((novels) => console.log(novels));

module.exports = { scrapeLatestRelease };
