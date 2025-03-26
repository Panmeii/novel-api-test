const axios = require("axios");
const cheerio = require("cheerio");
const BASE_URL = "https://bacalightnovel.co/";


async function scrapeLatestRelease(page){
  const url = `${BASE_URL}series/?page=${page}&status=&type=&order=update`;
  const $ = cheerio.load(data);
  const novel = [];

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
}

async function scrapeFinishedNovels(page){
  const url = `${BASE_URL}novel-tag/finished/page/${page}/`;
  const { data } = await axios.get(url);
  return scrapeData(data);
}
async function scrapeTrendingNovels(page){
  const url = `${BASE_URL}novel/page/${page}/?m_orderby=trending`;
  const { data } = await axios.get(url);
  return scrapeData(data);
}
async function scrapeMostViewedNovels(page){
  const url = `${BASE_URL}novel/page/${page}/?m_orderby=views`;
  const { data } = await axios.get(url);
  return scrapeData(data);
}
async function scrapeNewestNovels(page){
  const url = `${BASE_URL}novel/page/${page}/?m_orderby=new-manga`;
  const { data } = await axios.get(url);
  return scrapeData(data);
}
async function scrapeMostRatedNovels(page){
  const url = `${BASE_URL}novel/page/${page}/?m_orderby=rating`;
  const { data } = await axios.get(url);
  return scrapeData(data);
}
async function scrapeAllNovels(page){
  const url = `${BASE_URL}novel/page/${page}/?m_orderby=alphabet`;
  const { data } = await axios.get(url);
  return scrapeData(data);
}

module.exports = {
  scrapeLatestRelease,
  scrapeFinishedNovels,
  scrapeTrendingNovels,
  scrapeMostViewedNovels,
  scrapeNewestNovels,
  scrapeMostRatedNovels,
  scrapeAllNovels
};
