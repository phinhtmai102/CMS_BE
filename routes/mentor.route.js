const router = require('express').Router();
const mentor = require('../controllers/mentor.controller');
const verifySignUp = require('../middleware/verifySignUp');
// const { mentorInfo } = require('../models');

router.get('/', mentor.paginationS);
router.get('/all', mentor.getAllMentor);
router.get('/:id', mentor.getMentor);
router.post('/', verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted, mentor.creatAccount);
router.put('/:id', mentor.updateAccount);

module.exports = router;