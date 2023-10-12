import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Question = sequelize.define(
  "Question",
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

// servicio
export async function indexQuestions(options) {
  return (await Question.findAll( options )) ?? null;
}

export async function storeQuestion(question) {
  return await Question.create(question);
}

export async function updateQuestion(questionId, data) {
  const question = await Question.findByPk(questionId)
  return await question.update(data);
}

export async function showQuestion(questionId) {
  return (await Question.findByPk(questionId)) ?? null;
}

export async function destroyQuestion(questionId) {
  const question = await Question.findByPk(questionId)
  return await question.destroy();
}