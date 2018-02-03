const express = require('express');
const router = express.Router();

const api_controller = require('../controllers/api_controller');

//route for getting heallines for main page and the saved page
router.get('/', api_controller.index);
router.get('/headlines/:saved?', api_controller.getHeadlines);
router.get('/fetch', api_controller.fetch);
router.get('/notes/:article_id', api_controller.getNotes);

router.post('/notes', api_controller.saveNotes);
router.post('/headlines', api_controller.saveUnsavePage);


router.delete('/notes/:article_id', api_controller.deleteNotes);

module.exports = router;


