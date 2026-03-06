const router = require('express').Router();
const ctrl = require('./action.controller');
const auth = require('../../middlewares/auth');

/**
 @swagger
 
 * @swagger
 * /api/actions:
 *   get:
 *     summary: Get all recovery actions
 *     tags: [Actions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of actions }
 *   post:
 *     summary: Create a recovery action
 *     tags: [Actions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [client, type]
 *             properties:
 *               client:  { type: string, example: "64abc123..." }
 *               invoice: { type: string, example: "64abc456..." }
 *               type:    { type: string, enum: [call, email, letter, visit, other] }
 *               note:    { type: string }
 *               result:  { type: string, enum: [pending, promise, refused, no_answer] }
 *     responses:
 *       201: { description: Action created }
 */
router.use(auth);
router.get('/',  ctrl.getAll);
router.post('/', ctrl.create);

/**
 * @swagger
 * /api/actions/client/{clientId}:
 *   get:
 *     summary: Get actions by client
 *     tags: [Actions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Actions for client }
 */
router.get('/client/:clientId', ctrl.getByClient);

/**
 * @swagger
 * /api/actions/{id}:
 *   put:
 *     summary: Update action
 *     tags: [Actions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Action updated }
 *   delete:
 *     summary: Delete action
 *     tags: [Actions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Action deleted }
 */
router.put('/:id',    ctrl.update);
router.delete('/:id', ctrl.delete);

module.exports = router;