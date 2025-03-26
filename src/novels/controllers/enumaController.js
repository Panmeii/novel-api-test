const { scrapeLatestRelease } = require("../scrapper/enumaScrapper");

async function getLatestNovels(req, res) {
    try {
        // Ambil parameter dari query dengan validasi default
        const page = Math.max(parseInt(req.query.page) || 1, 1); // Pastikan minimal page = 1
        const perPage = Math.max(parseInt(req.query.perPage) || 10, 1); // Pastikan minimal perPage = 1
        const status = req.query.status || "";
        const type = req.query.type || "";
        const order = req.query.order || "update";

        // Scrape data dari sumber (satu halaman saja)
        const novels = await scrapeLatestRelease(page, status, type, order);

        if (!novels || novels.length === 0) {
            return res.status(404).json({ success: false, message: "No data found!" });
        }

        return res.status(200).json({
            success: true,
            source: "https://enuma.id/",
            total: novels.length,
            page,
            perPage,
            data: novels // Tidak perlu slicing, karena scraper hanya mengambil data dari halaman tertentu
        });
    } catch (error) {
        console.error("Failed to fetch data from Enuma:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Ekspor fungsi agar bisa digunakan di router
module.exports = { getLatestNovels };
