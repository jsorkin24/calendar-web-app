const router = require('express').Router();
const calController = require('../controllers/cal.controller')();

const path = require('path');
module.exports = router;

// api routes ===========================================================
router.get('/', calController.getAll)
router.post('/', calController.insert)

