const axios = require("axios");
const cheerio = require("cheerio");
const BASE_URL = "https://bacalightnovel.co/";

/**
 * Fungsi untuk mengambil data HTML dan mengolahnya menjadi JSON
 */
async function scrapeLatestRelease(page) {
    try {
        const url = `${BASE_URL}series/?page=${page}&status=&type=&order=update`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const novels = [];

        $(".inmain").each((i, element) => {
            const mdthumb = $(element).find(".mdthumb a");
            const mdinfo = $(element).find(".mdinfo");

            // Mengambil URL dan Cover
            const novelUrl = mdthumb.attr("href") || "";
            const cover = mdthumb.find("img").attr("src") || "";

            // Mengambil Judul dan Deskripsi
            const title = mdinfo.find("h2[itemprop='headline'] a").text().trim();
            const description = mdinfo.find(".contexcerpt p").text().trim();

            // Mengambil Genre
            const genres = [];
            mdinfo.find(".mdgenre a").each((_, genre) => {
                genres.push($(genre).text().trim());
            });

            // Mengambil Rating
            const rating = mdinfo.find(".mdminf i.fas.fa-star").parent().text().trim();

            // Mengambil Chapter Terbaru
            const latestChapter = mdinfo.find(".nchapter a").text().trim();
            const latestChapterUrl = mdinfo.find(".nchapter a").attr("href") || "";

            // Menyusun data ke dalam array
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
