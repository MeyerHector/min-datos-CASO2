import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const QuestionRespondent = sequelize.define(
  "QuestionRespondent",
  {
    respondentResponse: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    respondentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export async function storeManyOptions(options) {
  return await QuestionRespondent.bulkCreate(options);
}

export async function indexQuestionRespondent(options) {
    return (await QuestionRespondent.findAll( options ))?? null;
  }
