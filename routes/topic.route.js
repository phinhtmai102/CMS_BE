const router = require('express').Router();
const topic = require('../controllers/topic.controller');

router.get('/', topic.getAllTopic);
router.post('/', topic.createTopic);
module.exports = router;