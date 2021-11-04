const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('admins', [
      {
        name: 'admin',
        email: 'admin@invozone.com',
        password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(16), null),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('admins', null, {});
  },
};
