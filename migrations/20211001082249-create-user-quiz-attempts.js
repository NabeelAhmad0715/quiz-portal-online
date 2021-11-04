module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_quiz_attempts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      quiz_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      obtained_marks: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      has_passed: {
        type: Sequelize.BOOLEAN,
      },
      is_finished: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('user_quiz_attempts');
  },
};
