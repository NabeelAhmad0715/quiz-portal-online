const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.ScheduleQuiz, {
        through: 'UserScheduleQuiz',
        foreignKey: 'user_id',
        as: 'schedules_quizzes',
      });

      User.hasMany(models.UserQuizAttempt, {
        foreignKey: 'user_id',
        as: 'user_quiz_attempts',
      });

      User.hasMany(models.QuestionBank, {
        foreignKey: 'user_id',
        as: 'question_banks',
      });

      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'roles',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    },
  );
  return User;
};
