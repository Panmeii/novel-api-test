const axios = require("axios");
const cheerio = require("cheerio");
const BASE_URL = "https://fanstranslations.com/";

function scrapeData(data){
  const $ = cheerio.load(data);
  const novels = [];
  
  $(".page-listing-item  .badge-pos-1").each((i, element) => {
    const pageItemDetail = $(element).find(".page-item-detail");
    const id = pageItemDetail.find(".item-thumb a").first().attr("href").split(BASE_URL).pop();
    const cover = pageItemDetail.find(".item-thumb img").attr("src") || "";
    const itemDetails = $(element).find(".item-summary");
    const title = itemDetails.find(".post-title h3").text().trim() || "";
    const rating = $(element).find(".meta-item .post-total-rating span.score").text().trim() || "";
    const chapterCon = $(element).find(".list-chapter");
    const chapterList = [];
    chapterCon.find(".chapter-item").each((i, elem) => {
      const latestChapter = $(elem).find(".chapter a").text().trim() || "";
      const chapterId = $(elem).find(".chapter a").attr("href").split(BASE_URL).pop() || "";
      const uploadedTime = $(elem).find(".post-on").text().trim() || "";
      chapterList.push({ chapterId, latestChapter, uploadedTime, });
    });
    
    novels.push({ id, cover, title, rating, chapterList, });
  });
  return novels;
}

async function scrapeLatestRelease(page){
  const url = `${BASE_URL}page/${page}/`;
  const { data } = await axios.get(url);
  return scrapeData(data);
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