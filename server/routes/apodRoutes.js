const express = require('express');
const router = express.Router();
const apodController = require('../controllers/apodController');

router.get('/today', apodController.getTodayApod);
router.get('/date/:date', apodController.getApodByDate);
router.get('/recent', apodController.getRecentApods);

module.exports = router;
