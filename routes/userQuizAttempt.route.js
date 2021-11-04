const express = require('express');

const router = express.Router();
const {
  index,
  show,
  store,
  update,
  destroy,
} = require('../controllers/userQuizAttempt.controller');
const { checkRole, userAuth } = require('../utils/Auth');

/* Route Router */
router.get('/', userAuth, checkRole(['student']), index);
router.get('/:id/show', userAuth, checkRole(['student']), show);
router.post('/create', userAuth, checkRole(['student']), store);
router.put('/:id/update', userAuth, checkRole(['student']), update);
router.delete('/:id/delete', userAuth, checkRole(['student']), destroy);
module.exports = router;

/**
 * @swagger
 * /api/user-quiz-attempts:
 *   get:
 *     summary: all user quiz attempts
 *     tags: [User Quiz Attempts]
 *     parameters:
 *       - name: user_id
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
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: integer
 *             example:
 *               user_id: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UserQuizAttempt:
 *                   $ref: '#/components/schemas/UserQuizAttempt'
 *                 User:
 *                   $ref: '#/components/schemas/User'
 *                 UserQuizAttemptResponse:
 *                   $ref: '#/components/schemas/UserQuizAttemptResponse'
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
 * /api/user-quiz-attempts/{id}/show:
 *   get:
 *     summary: get user quiz attempt by id
 *     tags: [User Quiz Attempts]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: user_id
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
 *               - user_id
 *             properties:
 *               id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *             example:
 *               id: 1
 *               user_id: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UserQuizAttempt:
 *                   $ref: '#/components/schemas/UserQuizAttempt'
 *                 User:
 *                   $ref: '#/components/schemas/User'
 *                 UserQuizAttemptResponse:
 *                   $ref: '#/components/schemas/UserQuizAttemptResponse'
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
 * /api/user-quiz-attempts/create:
 *   post:
 *     summary: add user quiz attempt
 *     tags: [User Quiz Attempts]
 *     parameters:
 *       - name: user_id
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
 *               - user_id
 *               - quiz_id
 *               - obtained_marks
 *               - has_passed
 *               - is_finished
 *             properties:
 *               user_id:
 *                 type: integer
 *               quiz_id:
 *                 type: integer
 *               obtained_marks:
 *                 type: integer
 *               has_passed:
 *                 type: boolean
 *               is_finished:
 *                 type: boolean
 *             example:
 *               user_id: 1
 *               quiz_id: 1
 *               obtained_marks: 20
 *               has_passed: false
 *               is_finished: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UserQuizAttempt:
 *                   $ref: '#/components/schemas/UserQuizAttempt'
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
 * /api/user-quiz-attempts/{id}/update:
 *   put:
 *     summary: update user quiz attempts by id
 *     tags: [User Quiz Attempts]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *       - in: query
 *         name: user_id
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - quiz_id
 *               - obtained_marks
 *               - has_passed
 *               - is_finished
 *             properties:
 *               user_id:
 *                 type: integer
 *               quiz_id:
 *                 type: integer
 *               obtained_marks:
 *                 type: integer
 *               has_passed:
 *                 type: boolean
 *               is_finished:
 *                 type: boolean
 *             example:
 *               user_id: 1
 *               quiz_id: 1
 *               obtained_marks: 20
 *               has_passed: false
 *               is_finished: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UserQuizAttempt:
 *                   $ref: '#/components/schemas/UserQuizAttempt'
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: user quiz attempts Not Found
 */

/**
 * @swagger
 * /api/user-quiz-attempts/{id}/delete:
 *   delete:
 *     summary: delete user quiz attempts by id
 *     tags: [User Quiz Attempts]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *       - in: query
 *         name: user_id
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - user_id
 *             properties:
 *               id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *             example:
 *               id: 1
 *               user_id: 1
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
 *               message: user quiz attempts Not Found
 */
