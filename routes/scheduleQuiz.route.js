const express = require('express');

const router = express.Router();
const {
  index,
  show,
  store,
  update,
  destroy,
} = require('../controllers/scheduleQuiz.controller');
const { checkRole, userAuth } = require('../utils/Auth');

/* Route Router */
router.get('/', userAuth, checkRole(['admin', 'teacher']), index);
router.get('/:id/show', userAuth, checkRole(['admin', 'teacher']), show);
router.post('/create', userAuth, checkRole(['admin', 'teacher']), store);
router.put('/:id/update', userAuth, checkRole(['admin', 'teacher']), update);
router.delete(
  '/:id/delete',
  userAuth,
  checkRole(['admin', 'teacher']),
  destroy,
);
module.exports = router;

/**
 * @swagger
 * /api/schedule-quizzes:
 *   get:
 *     summary: all schedule Quizzes
 *     tags: [Schedule Quizzes]
 *     parameters:
 *       - name: user_id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: question_bank_id
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
 *               - question_bank_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               question_bank_id:
 *                 type: integer
 *             example:
 *               user_id: 1
 *               question_bank_id: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 scheduleQuiz:
 *                   $ref: '#/components/schemas/scheduleQuiz'
 *                 questionBank:
 *                   $ref: '#/components/schemas/QuestionBank'
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
 * /api/schedule-quizzes/{id}/show:
 *   get:
 *     summary: get schedule Quiz by id
 *     tags: [Schedule Quizzes]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: user_id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: question_bank_id
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
 *               - question_bank_id
 *             properties:
 *               id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               question_bank_id:
 *                 type: integer
 *             example:
 *               id: 1
 *               user_id: 1
 *               question_bank_id: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 scheduleQuiz:
 *                   $ref: '#/components/schemas/scheduleQuiz'
 *                 questionBank:
 *                   $ref: '#/components/schemas/QuestionBank'
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
 * /api/schedule-quizzes/create:
 *   post:
 *     summary: add schedule Quiz
 *     tags: [Schedule Quizzes]
 *     parameters:
 *       - name: user_id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: question_bank_id
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
 *               - question_bank_id
 *               - start_dateTime
 *               - end_dateTime
 *             properties:
 *               user_id:
 *                 type: integer
 *               question_bank_id:
 *                 type: integer
 *               start_dateTime:
 *                 type: timestamp
 *               end_dateTime:
 *                 type: timestamp
 *             example:
 *               user_id: 1
 *               question_bank_id: 1
 *               start_dateTime: '2021-10-06 01:32:45'
 *               end_dateTime: '2021-10-06 02:32:45'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ScheduleQuiz:
 *                   $ref: '#/components/schemas/ScheduleQuiz'
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
 * /api/schedule-quizzes/{id}/update:
 *   put:
 *     summary: update schedule Quiz by id
 *     tags: [Schedule Quizzes]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: user_id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: question_bank_id
 *         in: path
 *         type: integer
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - question_bank_id
 *               - start_dateTime
 *               - end_dateTime
 *             properties:
 *               user_id:
 *                 type: integer
 *               question_bank_id:
 *                 type: integer
 *               start_dateTime:
 *                 type: timestamp
 *               end_dateTime:
 *                 type: timestamp
 *             example:
 *               user_id: 1
 *               question_bank_id: 1
 *               start_dateTime: '2021-10-06 01:32:45'
 *               end_dateTime: '2021-10-06 02:32:45'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ScheduleQuiz:
 *                   $ref: '#/components/schemas/ScheduleQuiz'
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: Question Not Found
 */

/**
 * @swagger
 * /api/schedule-quizzes/{id}/delete:
 *   delete:
 *     summary: delete schedule Quiz by id
 *     tags: [Schedule Quizzes]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *       - name: user_id
 *         in: path
 *         type: integer
 *       - name: question_bank_id
 *         in: path
 *         type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - user_id
 *               - question_bank_id
 *             properties:
 *               id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               question_bank_id:
 *                 type: integer
 *             example:
 *               id: 1
 *               user_id: 1
 *               question_bank_id: 1
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
 *               message: schedule Quiz Not Found
 */
