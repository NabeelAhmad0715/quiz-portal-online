const { version } = require('../package.json');
require('dotenv').config();

const swaggerDef = {
  openapi: '3.0.1',
  info: {
    title: 'Node Express Swagger Ui',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}/`,
    },
  ],
};

module.exports = swaggerDef;
