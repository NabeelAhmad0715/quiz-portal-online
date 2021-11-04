const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserScheduleQuiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserScheduleQuiz.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'users',
      });
      UserScheduleQuiz.belongsTo(models.ScheduleQuiz, {
        foreignKey: 'schedule_quiz_id',
        as: 'schedule_quizzes',
      });
    }
  }
  UserScheduleQuiz.init(
    {
      user_id: DataTypes.INTEGER,
      schedule_quiz_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'user_schedule_quizzes',
      modelName: 'UserScheduleQuiz',
      timestamps: false,
    },
  );
  return UserScheduleQuiz;
};
