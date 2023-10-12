import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Option = sequelize.define(
  "Option",
  {
    option: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questionId: {
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
export async function indexOptions() {
  return (await Option.findAll()) ?? null;
}
export async function indexQuestionOptions(questionId) {
  return (await Option.findAll({ where: { questionId } })) ?? null;
}

export async function storeOption(option) {
  return await Option.create(option);
}

export async function updateOption(optionId, data) {
  const option = await Option.findByPk(optionId)
  return await option.update(data);
}

export async function showOption(optionId) {
  return (await Option.findByPk(optionId)) ?? null;
}

export async function destroyOption(optionId) {
  return (await Option.destroy({ where: { id: optionId } })) ?? null;
}
