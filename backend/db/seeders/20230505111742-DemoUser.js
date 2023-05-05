/* eslint-disable comma-dangle */
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          login: 'Igor',
          email: 'i@m.ru',
          password: await bcrypt.hash('123456', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'i',
          email: '1@m.ru',
          password: await bcrypt.hash('123456', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
