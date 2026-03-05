const router = require('express').Router();
const ctrl = require('./user.controller');
const auth = require('../../middlewares/auth');
const role = require('../../middlewares/role');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/', auth, role('admin'), ctrl.getAll);

module.exports = router;