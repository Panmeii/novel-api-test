const {
  scrapeLatestRelease
} = require("../scrapper/bacalightScrapper");

async function getLatestNovels(req, res) {
    // Ambil query params, jika tidak ada gunakan default value
    const page = req.query.page || 1;
    const status = req.query.status || "";
    const type = req.query.type || "";
    const order = req.query.order || "update";

    try {
        const data = await scrapeLatestRelease(page, status, type, order);
        if (data.length > 0) {
            return res.status(200).json({ 
                success: true, 
                page: Number(page), 
                status, 
                type, 
                order, 
                data 
            });
        } else {
            return res.status(404).json({ success: false, message: "No data found!" });
        }
    } catch (error) {
        console.error("Failed to fetch data from Bacalightnovel:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}





// Ekspor semua fungsi
module.exports = {
  getLatestNovels
};
