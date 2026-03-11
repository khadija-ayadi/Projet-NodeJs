const router = require('express').Router();
const ctrl = require('./stats.controller');
const auth = require('../../middlewares/auth');
const role = require('../../middlewares/role');

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: Dashboard statistics
 */

/**
 * @swagger
 * /api/stats/summary:
 *   get:
 *     summary: Get global statistics (manager/admin only)
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalClients:    { type: number }
 *                 totalInvoices:   { type: number }
 *                 totalCollected:  { type: number }
 *                 totalActions:    { type: number }
 *                 invoicesByStatus: { type: array }
 */
router.get('/summary', auth, role('manager', 'admin'), ctrl.getSummary);

module.exports = router;