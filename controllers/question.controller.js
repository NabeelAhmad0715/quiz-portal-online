const { QuestionBank } = require('../models');
const { Option } = require('../models');
const { Question } = require('../models');

const index = async (req, res, _next) => {
  try {
    const questions = await Question.findAll({
      tableName: 'question',
      include: [
        {
          model: QuestionBank,
          as: 'question_banks',
          where: { id: req.body.question_bank_id },
        },
        {
          model: Option,
          as: 'options',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: QuestionBank, as: 'question_banks' }, 'createdAt', 'DESC'],
        [{ model: Option, as: 'options' }, 'createdAt', 'DESC'],
      ],
    });
    return res.status(200).json(questions);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const show = async (req, res, _next) => {
  try {
    const question = await Question.findByPk(req.body.id, {
      include: [
        {
          model: QuestionBank,
          as: 'question_banks',
        },
        {
          model: Option,
          as: 'options',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: QuestionBank, as: 'question_banks' }, 'createdAt', 'DESC'],
        [{ model: Option, as: 'options' }, 'createdAt', 'DESC'],
      ],
    });
    if (!question) {
      return res.status(404).json({
        message: 'Question Not Found',
      });
    }
    return res.status(200).json(question);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const store = async (req, res, _next) => {
  try {
    const {
      description,
      question: text,
      tags,
      marks,
      question_bank_id: questionBankId,
    } = req.body;
    const question = await Question.create({
      question: text,
      description,
      tags: tags.join(', '),
      marks,
      question_bank_id: questionBankId,
    });
    req.body.options.map(async (option) => {
      await Option.create({
        is_correct: option.is_correct,
        text: option.option,
        question_id: question.id,
      });
    });
    return res.status(200).json(question);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const update = async (req, res, _next) => {
  try {
    const {
      description,
      question: text,
      tags,
      marks,
      id,
      question_bank_id: questionBankId,
    } = req.body;
    const question = await Question.findByPk(id, {
      include: [
        {
          model: QuestionBank,
          as: 'question_banks',
        },
        {
          model: Option,
          as: 'options',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: QuestionBank, as: 'question_banks' }, 'createdAt', 'DESC'],
        [{ model: Option, as: 'options' }, 'createdAt', 'DESC'],
      ],
    });
    if (!question) {
      return res.status(404).json({
        message: 'Question Not Found',
      });
    }
    const questionRecord = await question.update({
      question: text || question.question,
      description: description || question.description,
      tags: tags.join(', ') || question.tags,
      marks: marks || question.marks,
      question_bank_id: questionBankId || question.question_bank_id,
    });

    Option.destroy({
      where: { question_id: questionRecord.id },
    });
    req.body.options.map(async (option) => {
      await Option.create({
        is_correct: option.is_correct,
        text: option.text,
        question_id: questionRecord.id,
      });
    });
    return res.status(200).json(question);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const destroy = async (req, res, _next) => {
  try {
    const question = await Question.findByPk(req.body.id);
    if (!question) {
      return res.status(404).json({
        message: 'Question Not Found',
      });
    }
    await Option.destroy({
      where: { question_id: question.id },
    });
    await question.destroy();

    return res.status(200).json({ message: 'Question Deleted Successfully' });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
