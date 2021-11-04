const user = require('./user.controller');
const role = require('./role.controller');
const questionBank = require('./questionBank.controller');
const question = require('./question.controller');
const option = require('./option.controller');
const scheduleQuiz = require('./scheduleQuiz.controller');
const userScheduleQuiz = require('./userScheduleQuiz.controller');
const userQuizAttempt = require('./userQuizAttempt.controller');

module.exports = {
  user,
  role,
  questionBank,
  question,
  option,
  scheduleQuiz,
  userScheduleQuiz,
  userQuizAttempt,
};
