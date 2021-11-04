const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ScheduleQuiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ScheduleQuiz.belongsTo(models.QuestionBank, {
        foreignKey: 'question_bank_id',
        as: 'schedule_quizzes',
      });

      ScheduleQuiz.belongsToMany(models.User, {
        through: 'UserScheduleQuiz',
        foreignKey: 'schedule_quiz_id',
        as: 'users',
      });
    }
  }
  ScheduleQuiz.init(
    {
      user_id: DataTypes.INTEGER,
      question_bank_id: DataTypes.INTEGER,
      start_dateTime: DataTypes.DATE,
      end_dateTime: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'schedule_quizzes',
      modelName: 'ScheduleQuiz',
    },
  );
  return ScheduleQuiz;
};
