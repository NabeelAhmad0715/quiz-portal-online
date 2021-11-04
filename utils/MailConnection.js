const mailer = require('nodemailer');

const transporter = mailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'd4d8096c377bae',
    pass: '6d7fe228c735b1',
  },
});

module.exports = transporter;
