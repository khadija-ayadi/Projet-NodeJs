const router = require('express').Router();
const ctrl = require('./payment.controller');
const auth = require('../../middlewares/auth');

router.use(auth);
router.post('/',                    ctrl.record);
router.get('/',                     ctrl.getAll);
router.get('/invoice/:invoiceId',   ctrl.getByInvoice);

module.exports = router;