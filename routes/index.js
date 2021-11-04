const express = require('express');
const userRoute = require('./user.route');
const roleRoute = require('./role.route');
const questionBankRoute = require('./questionBank.route');
const questionRoute = require('./question.route');
const optionRoute = require('./option.route');
const scheduleQuizRoute = require('./scheduleQuiz.route');
const userScheduleQuizRoute = require('./userScheduleQuiz.route');
const userQuizAttemptRoute = require('./userQuizAttempt.route');
const config = require('../config/config.json');
// const docsRoute = require('./docs.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/api/users',
    route: userRoute,
  },
  {
    path: '/api/roles',
    route: roleRoute,
  },
  {
    path: '/api/question-banks',
    route: questionBankRoute,
  },
  {
    path: '/api/question-banks/questions',
    route: questionRoute,
  },
  {
    path: '/api/question-banks/questions/options',
    route: optionRoute,
  },
  {
    path: '/api/schedule-quizzes',
    route: scheduleQuizRoute,
  },
  {
    path: '/api/user-schedule-quizzes',
    route: userScheduleQuizRoute,
  },
  {
    path: '/api/user-quiz-attempts',
    route: userQuizAttemptRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// if (process.env.ENVIRONMENT === 'development') {
//   const devRoutes = [
//     // routes available only in development mode
//     {
//       path: '/api/swagger',
//       route: docsRoute,
//     },
//   ];

//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

router.get('/', (req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(
    `<h1 style="text-align:center">Welcome to InvoZone NodeJS Training Session ${config.env_development} Mode</h1>`,
  );
});
module.exports = router;
