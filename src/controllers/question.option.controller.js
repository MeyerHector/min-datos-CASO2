import {
  indexQuestionOptions,
  storeOption,
  updateOption,
} from "../models/option.model.js";

export const indexQuestOptions = async (req, res) => {
  const { questionId } = req.params;

  try {
    const options = await indexQuestionOptions(questionId);
    return res.json(options);
  } catch (error) {
    console.log(error);
  }
};
export const storeQuestionOptions = async (req, res) => {
  const { questionId } = req.params;
  const { option } = req.body;

  try {
    const newOption = await storeOption({ option, questionId });

    return res
      .status(201)
      .json({ option: newOption, message: "La opción se creó correctamente." });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};
export const editQuestionOptions = async (req, res) => {
  const { questionId, optionId } = req.params;
  const { option } = req.body;

  console.log(req.body);

  try {
    const updatedOption = await updateOption(optionId, { option });
    return res.json({
      option: updatedOption,
      message: "La opción se editó correctamente.",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};
export const destroyQuestionOptions = (req, res) => {};
