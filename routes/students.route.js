const router = require('express').Router();
const student = require('../controllers/students.controller');

router.get('/', student.paginationS);
// router.get('//published', student.findAllPublished);
router.get('/all', student.getAllStudents);
router.get('/:id', student.getStudent);
router.delete('/:id', student.deleteStudent);
router.put('/:id', student.updateStudent);
module.exports = router;