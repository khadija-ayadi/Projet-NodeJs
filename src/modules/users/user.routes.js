const router = require('express').Router();
const ctrl = require('./user.controller');
const auth = require('../../middlewares/auth');
const role = require('../../middlewares/role');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Authentication & user management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, role]
 *             properties:
 *               name:     { type: string, example: "John Doe" }
 *               email:    { type: string, example: "john@example.com" }
 *               password: { type: string, example: "123456" }
 *               role:     { type: string, enum: [agent, manager, admin] }
 *     responses:
 *       201: { description: User created }
 *       400: { description: Email already in use }
 */
router.post('/register', ctrl.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Users]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:    { type: string, example: "john@example.com" }
 *               password: { type: string, example: "123456" }
 *     responses:
 *       200: { description: Returns JWT token }
 *       401: { description: Invalid credentials }
 */
router.post('/login', ctrl.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: List of users }
 *       403: { description: Forbidden }
 */
router.get('/', auth, role('admin'), ctrl.getAll);

module.exports = router;