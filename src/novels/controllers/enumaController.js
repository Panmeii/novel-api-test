const { scrapeLatestRelease } = require("../scrapper/enumaScrapper");

async function getLatestNovels(req, res) {
    try {
        // Ambil parameter dari query
        const page = parseInt(req.query.page) || 1; // Default ke page 1
        const perPage = parseInt(req.query.perPage) || 10; // Default ke 10 items per halaman
        const status = req.query.status || "";
        const type = req.query.type || "";
        const order = req.query.order || "update";

        // Scrape data dari sumber
        const novels = await scrapeLatestRelease(page, status, type, order);

        if (!novels || novels.length === 0) {
            return res.status(404).json({ success: false, message: "No data found!" });
        }

        // Pagination (Pastikan data tidak kosong sebelum slicing)
        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;
        const paginatedNovels = novels.slice(startIndex, endIndex);

        return res.status(200).json({
            success: true,
            source: "https://enuma.id/",
            total: novels.length,
            page,
            perPage,
            data: paginatedNovels
        });
    } catch (error) {
        console.error("Failed to fetch data from Enuma:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Ekspor fungsi agar bisa digunakan di router
module.exports = { getLatestNovels };
