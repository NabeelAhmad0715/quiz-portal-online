const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.QuestionBank, {
        foreignKey: 'question_bank_id',
        as: 'question_banks',
      });

      Question.hasMany(models.Option, {
        foreignKey: 'question_id',
        as: 'options',
      });
    }
  }
  Question.init(
    {
      question_bank_id: DataTypes.INTEGER,
      question: DataTypes.TEXT,
      description: DataTypes.TEXT,
      tags: DataTypes.TEXT,
      marks: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'questions',
      modelName: 'Question',
    },
  );
  return Question;
};
