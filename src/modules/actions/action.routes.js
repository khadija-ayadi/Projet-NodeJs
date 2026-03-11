const router = require('express').Router();
const ctrl = require('./action.controller');
const auth = require('../../middlewares/auth');
<<<<<<< HEAD
const { validateInvoice } = require('../../middlewares/validate');
=======
const {validateAction } = require('../../middlewares/validate');
>>>>>>> 3354299 (last modification)
/**
 * @swagger
 * tags:
 *   name: Actions
 *   description: Recovery actions management
 */

/**
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
<<<<<<< HEAD
router.post('/', validateInvoice, ctrl.create);
=======
router.post('/', validateAction, ctrl.create);
>>>>>>> 3354299 (last modification)

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
<<<<<<< HEAD
router.put('/:id', validateInvoice, ctrl.update);
=======
router.put('/:id', validateAction, ctrl.update);
>>>>>>> 3354299 (last modification)
router.delete('/:id', ctrl.delete);

module.exports = router;