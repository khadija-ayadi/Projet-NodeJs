const router = require('express').Router();
const ctrl = require('./client.controller');
const auth = require('../../middlewares/auth');
const { validateClient } = require('../../middlewares/validate');





/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of clients }
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:    { type: string, example: "Entreprise ABC" }
 *               email:   { type: string, example: "abc@company.com" }
 *               phone:   { type: string, example: "0612345678" }
 *               address: { type: string, example: "Tunis, Tunisie" }
 *               status:  { type: string, enum: [active, inactive, litigieux] }
 *     responses:
 *       200: { description: Client created }
 */
router.use(auth);
router.get('/',    ctrl.getAll);
<<<<<<< HEAD
router.post('/', ctrl.create);
router.get('/:id',    ctrl.getById);
router.put('/:id', ctrl.update);
=======
router.post('/', validateClient , ctrl.create);
router.get('/:id',    ctrl.getById);
router.put('/:id',  validateClient, ctrl.update);
>>>>>>> 3354299 (last modification)
router.delete('/:id', ctrl.delete);

module.exports = router;