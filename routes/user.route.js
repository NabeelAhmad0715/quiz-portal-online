const express = require('express');
// const validation = require('../middleware').userMiddleware;

const router = express.Router();
const {
  index,
  show,
  register,
  update,
  destroy,
  login,
  token,
  changePassword,
} = require('../controllers/user.controller');
// const { checkRole, userAuth } = require('../utils/Auth');
// userAuth, checkRole(['admin', 'teacher']),
/* Route Router */
router.get('/', index);
router.post('/login', login);
router.post('/token', token);
router.get('/:id/show', show);
router.post('/signup', register);
router.put('/:id/change-password', changePassword);
router.put('/:id/update', update);
router.delete('/:id/delete', destroy);
module.exports = router;

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: all users
 *     tags: [Users]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 User:
 *                   $ref: '#/components/schemas/User'
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: Not Found
 */

/**
 * @swagger
 * /api/users/{id}/show:
 *   get:
 *     summary: get user by id
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *             example:
 *               id: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 User:
 *                   $ref: '#/components/schemas/User'
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: Not Found
 */

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: add user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: xyz
 *               email: xyz@gmail.com
 *               password: xyz1234
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 User:
 *                   $ref: '#/components/schemas/User'
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: Not Found
 */

/**
 * @swagger
 * /api/users/{id}/update:
 *   put:
 *     summary: update user by id
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: xyz
 *               email: xyz@gmail.com
 *               password: xyz1234
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 User:
 *                   $ref: '#/components/schemas/User'
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: User Not Found
 */

/**
 * @swagger
 * /api/users/{id}/delete:
 *   delete:
 *     summary: delete user by id
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *             example:
 *               id: 1
 *     responses:
 *       "204":
 *         description: OK
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: User Not Found
 */
