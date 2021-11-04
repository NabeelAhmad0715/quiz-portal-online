const { Option } = require('../models');
const { Question } = require('../models');

const index = async (req, res, _next) => {
  try {
    const options = await Option.findAll(
      { where: { question_id: req.body.question_id } },
      {
        tableName: 'options',
        include: [
          {
            model: Question,
            as: 'questions',
          },
        ],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Question, as: 'questions' }, 'createdAt', 'DESC'],
        ],
      },
    );
    return res.status(200).json(options);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const show = async (req, res, _next) => {
  try {
    const option = await Option.findByPk(req.body.id, {
      include: [
        {
          model: Question,
          as: 'questions',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: Question, as: 'questions' }, 'createdAt', 'DESC'],
      ],
    });
    if (!option) {
      return res.status(404).json({
        message: 'Option Not Found',
      });
    }
    return res.status(200).json(option);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const store = async (req, res, _next) => {
  try {
    const { is_correct: isCorrect, text, question_id: QuestionId } = req.body;
    const option = await Option.create({
      isCorrect,
      text,
      QuestionId,
    });
    return res.status(200).json(option);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const update = async (req, res, _next) => {
  try {
    const {
      id,
      is_correct: isCorrect,
      text,
      question_id: QuestionId,
    } = req.body;
    const option = await Option.findByPk(id, {
      include: [
        {
          model: Question,
          as: 'questions',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: Question, as: 'questions' }, 'createdAt', 'DESC'],
      ],
    });
    if (!option) {
      return res.status(404).json({
        message: 'Option Not Found',
      });
    }
    await Option.update({
      is_correct: isCorrect || option.is_correct,
      text: text || option.text,
      question_id: QuestionId || option.question_id,
    });
    return res.status(200).json(option);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const destroy = async (req, res, _next) => {
  try {
    const option = await Option.findByPk(req.body.id);
    if (!option) {
      return res.status(404).json({
        message: 'Option Not Found',
      });
    }
    await option.destroy();
    return res.status(200).json({ message: 'Option Deleted Successfully' });
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
