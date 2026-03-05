const router = require('express').Router();
const ctrl = require('./action.controller');
const auth = require('../../middlewares/auth');

router.use(auth);
router.get('/',                    ctrl.getAll);
router.post('/',                   ctrl.create);
router.get('/client/:clientId',    ctrl.getByClient);
router.put('/:id',                 ctrl.update);
router.delete('/:id',              ctrl.delete);

module.exports = router;