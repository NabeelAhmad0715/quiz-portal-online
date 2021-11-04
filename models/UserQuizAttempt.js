const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserQuizAttempt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserQuizAttempt.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'users',
      });
    }
  }
  UserQuizAttempt.init(
    {
      user_id: DataTypes.INTEGER,
      quiz_id: DataTypes.INTEGER,
      obtained_marks: DataTypes.INTEGER,
      has_passed: DataTypes.BOOLEAN,
      is_finished: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      tableName: 'user_quiz_attempts',
      modelName: 'UserQuizAttempt',
    },
  );
  return UserQuizAttempt;
};
