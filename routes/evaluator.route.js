const router = require('express').Router();
const evaluator = require('../controllers/evaluator.controller');
const verifySignUp = require('../middleware/verifySignUp');

router.get('/', evaluator.paginationS);
router.get('/all', evaluator.getAllEvaluator);
router.get('/:id', evaluator.getEvaluator);

router.post('/', verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted, evaluator.creatAccount);
router.put('/updateEvaluator/:id', evaluator.updateAccount);

module.exports = router;