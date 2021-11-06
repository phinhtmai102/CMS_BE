const router = require('express').Router();
const group = require('../controllers/group.controller');

router.get('/',group.getAllGroups);
router.post('/', group.creatGroups);

module.exports = router;