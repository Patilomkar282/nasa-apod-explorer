require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apodRoutes = require('./routes/apodRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/apod', apodRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
