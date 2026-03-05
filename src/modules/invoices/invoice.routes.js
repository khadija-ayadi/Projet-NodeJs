const router = require('express').Router();
const ctrl = require('./invoice.controller');
const auth = require('../../middlewares/auth');

router.use(auth);
router.get('/',           ctrl.getAll);
router.post('/',          ctrl.create);
router.get('/:id',        ctrl.getById);
router.put('/:id',        ctrl.update);
router.patch('/:id/status', ctrl.updateStatus);
router.delete('/:id',     ctrl.delete);

module.exports = router;