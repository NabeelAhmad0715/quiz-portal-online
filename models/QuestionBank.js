const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuestionBank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuestionBank.hasMany(models.Question, {
        foreignKey: 'question_bank_id',
        as: 'questions',
      });

      QuestionBank.hasMany(models.ScheduleQuiz, {
        foreignKey: 'question_bank_id',
        as: 'schedule_quizzes',
      });

      QuestionBank.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'users',
      });
    }
  }
  QuestionBank.init(
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'question_banks',
      modelName: 'QuestionBank',
    },
  );
  return QuestionBank;
};
