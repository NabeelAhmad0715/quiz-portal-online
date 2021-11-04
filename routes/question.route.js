const express = require('express');

const router = express.Router();
const {
  index,
  show,
  store,
  update,
  destroy,
} = require('../controllers/question.controller');
// const { checkRole, userAuth } = require('../utils/Auth');

/* Route Router */
router.post('/', index);
router.post('/:id/show', show);
router.post('/create', store);
router.put('/:id/update', update);
router.delete('/:id/delete', destroy);
module.exports = router;

/**
 * @swagger
 * /api/question-banks/questions:
 *   get:
 *     summary: all questions
 *     tags: [Questions]
 *     parameters:
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
 *               - question_bank_id
 *             properties:
 *               question_bank_id:
 *                 type: integer
 *             example:
 *               question_bank_id: 1
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
 *                 option:
 *                   $ref: '#/components/schemas/Option'
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
 * /api/question-banks/questions/{id}/show:
 *   get:
 *     summary: get question by id
 *     tags: [Questions]
 *     parameters:
 *       - name: id
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
 *               - question_bank_id
 *             properties:
 *               id:
 *                 type: integer
 *               question_bank_id:
 *                 type: integer
 *             example:
 *               id: 1
 *               question_bank_id: 1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 question:
 *                   $ref: '#/components/schemas/Question'
 *                 questionBank:
 *                   $ref: '#/components/schemas/QuestionBank'
 *                 option:
 *                   $ref: '#/components/schemas/Option'
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
 * /api/question-banks/questions/create:
 *   post:
 *     summary: add question
 *     tags: [Questions]
 *     parameters:
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
 *               - question_bank_id
 *               - question
 *               - tags
 *               - marks
 *             properties:
 *               question_bank_id:
 *                 type: integer
 *               question:
 *                 type: string
 *               description:
 *                 type: text
 *               marks:
 *                 type: integer
 *               tags:
 *                 type: string
 *             example:
 *               question_bank_id: 1
 *               question: 'What is nodejs default port'
 *               description: xyz
 *               marks: 5
 *               tags: php,javascript
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 question:
 *                   $ref: '#/components/schemas/Question'
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
 * /api/question-banks/questions/{id}/update:
 *   put:
 *     summary: update question by id
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *       - in: query
 *         name: question_bank_id
 *         required: true
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question_bank_id
 *               - question
 *               - tags
 *               - marks
 *             properties:
 *               question_bank_id:
 *                 type: integer
 *               question:
 *                 type: string
 *               description:
 *                 type: text
 *               marks:
 *                 type: integer
 *               tags:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 question:
 *                   $ref: '#/components/schemas/Question'
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
 * /api/question-banks/questions/{id}/delete:
 *   delete:
 *     summary: delete question by id
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *       - in: query
 *         name: question_bank_id
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
 *               message: Question Not Found
 */
