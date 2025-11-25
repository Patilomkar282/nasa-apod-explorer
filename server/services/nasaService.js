const axios = require('axios');
const { LRUCache } = require('lru-cache');

const API_KEY = process.env.NASA_API_KEY;
const BASE_URL = process.env.NASA_BASE_URL;

// Configure Cache
// Max 100 items, TTL 1 hour (3600000 ms)
const cache = new LRUCache({
    max: 100,
    ttl: 1000 * 60 * 60,
});

// Helper to get a "safe" date (NY time - 6 hours) to ensure APOD is available
const getSafeDate = () => {
    const now = new Date();
    // Subtract 6 hours to treat 00:00-06:00 NY time as the previous day
    // This avoids 404s when the new APOD isn't published yet
    const safeTime = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    return safeTime.toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
};

// Mock Data for Fallback
const MOCK_APOD = {
    date: new Date().toISOString().split('T')[0],
    explanation: "This is a fallback image because the NASA API rate limit was reached. Enjoy this view of the Cosmos!",
    hdurl: "https://apod.nasa.gov/apod/image/2311/OrionBelt_Alnitak_960.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Orion's Belt (Mock Data)",
    url: "https://apod.nasa.gov/apod/image/2311/OrionBelt_Alnitak_960.jpg"
};

const getApodForDate = async (date) => {
    const cacheKey = `date-${date}`;
    if (cache.has(cacheKey)) {
        console.log(`Serving from cache: ${date}`);
        return cache.get(cacheKey);
    }

    console.log(`Fetching from NASA API: ${date}`);
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                api_key: API_KEY,
                date: date
            }
        });

        const data = response.data;
        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 429) {
                console.warn('Rate limit hit (429). Serving mock data.');
                return { ...MOCK_APOD, date: date };
            }
            if (error.response.status === 404) {
                // If today's image is not found, try yesterday's
                const today = getSafeDate();
                if (date === today) {
                    console.log('Today APOD not found, trying yesterday...');
                    const yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toISOString().split('T')[0];
                    return getApodForDate(yesterdayStr);
                }
            }
        }
        throw error;
    }
};

const getRecentApods = async (count) => {
    // Use safe date to avoid requesting future/unpublished dates
    const endStr = getSafeDate();

    // Calculate start date based on the safe end date
    const endDateObj = new Date(endStr);
    const startDateObj = new Date(endDateObj);
    startDateObj.setDate(endDateObj.getDate() - count + 1);

    const startStr = startDateObj.toISOString().split('T')[0];

    const cacheKey = `range-${startStr}-${endStr}`;
    if (cache.has(cacheKey)) {
        console.log(`Serving range from cache: ${cacheKey}`);
        return cache.get(cacheKey);
    }

    console.log(`Fetching range from NASA API: ${startStr} to ${endStr}`);
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                api_key: API_KEY,
                start_date: startStr,
                end_date: endStr
            }
        });

        // NASA API returns array for range queries
        const data = response.data.reverse(); // Show newest first
        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.warn('Rate limit hit (429). Serving mock list.');
            // Generate a list of mock items
            const mockList = Array.from({ length: count }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - i);
                return { ...MOCK_APOD, date: d.toISOString().split('T')[0], title: `Mock Image ${i + 1}` };
            });
            return mockList;
        }
        throw error;
    }
};

module.exports = {
    getApodForDate,
    getRecentApods,
    getSafeDate // Exporting for controller use
};
