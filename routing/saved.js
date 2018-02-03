const express = require('express');
const router = express.Router();

const saved_controller = require('../controllers/saved_controller');

router.get('/', saved_controller.savedPage);

module.exports = router;
