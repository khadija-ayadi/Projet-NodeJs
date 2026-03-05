const router = require('express').Router();
const ctrl = require('./stats.controller');
const auth = require('../../middlewares/auth');
const role = require('../../middlewares/role');

router.get('/summary', auth, role('manager', 'admin'), ctrl.getSummary);
module.exports = router;