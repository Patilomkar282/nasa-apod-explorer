const nasaService = require('../services/nasaService');

const getTodayApod = async (req, res) => {
    try {
        // Use safe date logic from service
        const today = nasaService.getSafeDate();
        const data = await nasaService.getApodForDate(today);
        res.json(data);
    } catch (error) {
        console.error('Error fetching today APOD:', error.message);
        const status = error.response ? error.response.status : 500;
        const message = error.response && error.response.data ? error.response.data.msg : 'Failed to fetch APOD data';
        res.status(status).json({ error: message });
    }
};

const getApodByDate = async (req, res) => {
    const { date } = req.params;
    // Basic date validation (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }

    try {
        const data = await nasaService.getApodForDate(date);
        res.json(data);
    } catch (error) {
        console.error(`Error fetching APOD for ${date}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch APOD data' });
    }
};

const getRecentApods = async (req, res) => {
    const count = req.query.count || 10;
    try {
        const data = await nasaService.getRecentApods(count);
        res.json(data);
    } catch (error) {
        console.error('Error fetching recent APODs:', error.message);
        res.status(500).json({ error: 'Failed to fetch recent APODs' });
    }
};

module.exports = {
    getTodayApod,
    getApodByDate,
    getRecentApods
};
