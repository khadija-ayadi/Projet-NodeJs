const router = require('express').Router();
const ctrl = require('./invoice.controller');
const auth = require('../../middlewares/auth');
const { validateInvoice } = require('../../middlewares/validate');

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Invoice management
 */

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of invoices }
 *   post:
 *     summary: Create an invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [client, amount, dueDate]
 *             properties:
 *               client:      { type: string, example: "64abc123..." }
 *               amount:      { type: number, example: 1500 }
 *               dueDate:     { type: string, format: date, example: "2024-12-31" }
 *               description: { type: string }
 *               status:      { type: string, enum: [pending, paid, overdue, partial] }
 *     responses:
 *       201: { description: Invoice created }
 */
router.use(auth);
router.get('/',  ctrl.getAll);
router.post('/', validateInvoice   , ctrl.create);
router.get('/:id',    ctrl.getById);
router.put('/:id', validateInvoice, ctrl.update);
router.delete('/:id', ctrl.delete);
router.patch('/:id/status', ctrl.updateStatus);

module.exports = router;