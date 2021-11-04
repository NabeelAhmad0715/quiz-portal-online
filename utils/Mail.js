const transporter = require('./MailConnection');

const sendEmail = (message) => async (_req, _res, _next) => {
  console.log(message);
  // sending the email
  try {
    await transporter.sendMail({
      from: '"Peter" <peter@kayere.com>',
      to: '"You there" <you@there.com>',
      subject: 'Scheduled Email Test',
      text: message,
    });
    console.log(`Email sent on ${new Date()}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendEmail,
};
