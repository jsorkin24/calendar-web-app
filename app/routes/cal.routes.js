const router = require('express').Router();
const calController = require('../controllers/cal.controller')();

const path = require('path');
module.exports = router;

// api routes ===========================================================
router.get('/', calController.getAll)
router.get('/:id', calController.getOneById)
router.post('/', calController.insert)
router.put('/:id', calController.updateById)
router.delete('/:id', calController.removeById)

