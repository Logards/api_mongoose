const express = require('express');
const router = express.Router();
const profileRoutes = require('./');

router.use('/api', profileRoutes);

module.exports = router;
