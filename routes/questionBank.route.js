const express = require('express');

const router = express.Router();
const {
  index,
  show,
  store,
  update,
  destroy,
} = require('../controllers/questionBank.controller');
// const { userAuth, checkRole } = require('../utils/Auth');

/* Route Router */
router.post('/', index);
router.post('/:id/show', show);
router.post('/create', store);
router.put('/:id/update', update);
router.delete('/:id/delete', destroy);
module.exports = router;

/**
 * @swagger
 * /api/user/question-banks:
 *   get:
 *     summary: all question Banks
 *     tags: [Question Banks]
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
 *                 questionBank:
 *                   $ref: '#/components/schemas/QuestionBank'
 *                 question:
 *                   $ref: '#/components/schemas/Question'
 *                 scheduleQuiz:
 *                   $ref: '#/components/schemas/ScheduleQuiz'
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
 * /api/user/question-banks/{id}/show:
 *   get:
 *     summary: get question Bank by id
 *     tags: [Question Banks]
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
 *                 questionBank:
 *                   $ref: '#/components/schemas/QuestionBank'
 *                 question:
 *                   $ref: '#/components/schemas/Question'
 *                 scheduleQuiz:
 *                   $ref: '#/components/schemas/ScheduleQuiz'
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
 * /api/user/question-banks/create:
 *   post:
 *     summary: add question Bank
 *     tags: [Question Banks]
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
 *               - name
 *               - type
 *             properties:
 *               user_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *             example:
 *               user_id: 1
 *               name: xyz
 *               type: javascript
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questionBank:
 *                   $ref: '#/components/schemas/QuestionBank'
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
 * /api/user/question-banks/{id}/update:
 *   put:
 *     summary: update question Bank by id
 *     tags: [Question Banks]
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
 *               - name
 *               - type
 *             properties:
 *               user_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *             example:
 *               user_id: xyz
 *               name: xyz
 *               type: javascript
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questionBank:
 *                   $ref: '#/components/schemas/QuestionBank'
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: Question Bank Not Found
 */

/**
 * @swagger
 * /api/user/question-banks/{id}/delete:
 *   delete:
 *     summary: delete question bank by id
 *     tags: [Question Banks]
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
 *               message: Question Bank Not Found
 */
