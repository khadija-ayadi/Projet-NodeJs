const router = require('express').Router();
const ctrl = require('./payment.controller');
const auth = require('../../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Manual payment recording
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Record a manual payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [invoice, amount]
 *             properties:
 *               invoice: { type: string, example: "64abc123..." }
 *               amount:  { type: number, example: 500 }
 *               note:    { type: string, example: "Partial payment received" }
 *     responses:
 *       201: { description: Payment recorded, invoice status auto-updated }
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of payments }
 */
router.use(auth);
router.post('/', ctrl.record);
router.get('/',  ctrl.getAll);
router.get('/invoice/:invoiceId', ctrl.getByInvoice);

module.exports = router;