import { showQuestion } from "../models/question.model.js";

//VISTAS

export const showView = (req, res) => {
  const questionId = req.params.questionId;
  res.render("question/show", { questionId });
};


//APIS

export const edit = async (req, res) => {
    console.log(req.body, req.params);

    const { questionId } = req.params;
    const { question } = req.body;
  
  try {
    const updateQuestion = await showQuestion(questionId);

    updateQuestion.update({
        question
    });
    return res.json({ question: updateQuestion, message: 'La pregunta se editó correctamente.' });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }

}
export const destroy =  async (req, res) => {

}