const { ScheduleQuiz, UserScheduleQuiz, User } = require('../models');

const index = async (_req, res, _next) => {
  try {
    const userScheduleQuizzes = await UserScheduleQuiz.findAll({
      tableName: 'user_schedule_quizzes',
      include: [
        {
          model: User,
          as: 'users',
        },
        {
          model: ScheduleQuiz,
          as: 'schedule_quizzes',
        },
      ],
      order: [
        [{ model: User, as: 'users' }, 'createdAt', 'DESC'],
        [{ model: ScheduleQuiz, as: 'schedule_quizzes' }, 'createdAt', 'DESC'],
      ],
    });
    return res.status(200).json(userScheduleQuizzes);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const show = async (req, res, _next) => {
  try {
    const userScheduleQuiz = await UserScheduleQuiz.findByPk(req.body.id, {
      include: [
        {
          model: User,
          as: 'users',
        },
        {
          model: ScheduleQuiz,
          as: 'schedule_quizzes',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: User, as: 'users' }, 'createdAt', 'DESC'],
        [{ model: ScheduleQuiz, as: 'schedule_quizzes' }, 'createdAt', 'DESC'],
      ],
    });
    if (!userScheduleQuiz) {
      return res.status(404).json({
        message: 'User Schedule Quiz Not Found',
      });
    }
    return res.status(200).json(userScheduleQuiz);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const store = async (req, res, _next) => {
  try {
    const { schedule_quiz_id: scheduleQuizId, user_id: userId } = req.body;
    const userScheduleQuiz = await UserScheduleQuiz.create({
      scheduleQuizId,
      userId,
    });
    return res.status(200).json(userScheduleQuiz);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const update = async (req, res, _next) => {
  try {
    const { schedule_quiz_id: scheduleQuizId, user_id: userId, id } = req.body;
    const userScheduleQuiz = await UserScheduleQuiz.findByPk(id, {
      include: [
        {
          model: User,
          as: 'users',
        },
        {
          model: ScheduleQuiz,
          as: 'schedule_quizzes',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: User, as: 'users' }, 'createdAt', 'DESC'],
        [{ model: ScheduleQuiz, as: 'schedule_quizzes' }, 'createdAt', 'DESC'],
      ],
    });
    if (!userScheduleQuiz) {
      return res.status(404).json({
        message: 'User Schedule Quiz Not Found',
      });
    }
    await userScheduleQuiz.update({
      schedule_quiz_id: scheduleQuizId || userScheduleQuiz.schedule_quiz_id,
      user_id: userId || userScheduleQuiz.user_id,
    });
    return res.status(200).json(userScheduleQuiz);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const destroy = async (req, res, _next) => {
  try {
    const userScheduleQuiz = await UserScheduleQuiz.findByPk(req.body.id);
    if (!userScheduleQuiz) {
      return res.status(404).json({
        message: 'User Schedule Quiz Not Found',
      });
    }
    await userScheduleQuiz.destroy();
    return res
      .status(200)
      .json({ message: 'User Schedule Quiz Deleted Successfully' });
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
