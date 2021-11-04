module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_schedule_quizzes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          // Required field
          model: 'users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      schedule_quiz_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          // Required field
          model: 'schedule_quizzes',
          key: 'id',
        },
        onDelete: 'cascade',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('user_schedule_quizzes');
  },
};
