module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schedule_quizzes', {
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
      question_bank_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          // Required field
          model: 'question_banks',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      start_dateTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      end_dateTime: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('schedule_quizzes');
  },
};
