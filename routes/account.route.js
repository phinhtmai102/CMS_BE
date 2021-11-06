const account = require('../controllers/account.controller');
const router = require('express').Router();


router.get('/', account.paginationS);
router.post('/', account.createAccount);
router.get('/', account.getAllAccount);
router.get('/:id', account.getAccount);
router.delete('/:id', account.deleteAccount);
router.put('/:id', account.updateAccount);

module.exports = router;