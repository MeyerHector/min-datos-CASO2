import { destroyQuestion, showQuestion, updateQuestion } from "../models/question.model.js";

//VISTAS

export const showView = async (req, res) => {
  const questionId = req.params.questionId;
  const q = await showQuestion(questionId);
  res.render("admin/question/show", { questionId, question: q.question });
};


//APIS

export const edit = async (req, res) => {
    console.log(req.body, req.params);

    const { questionId } = req.params;
    const { question } = req.body;
  
  try {
    const updatedQuestion = await updateQuestion(questionId,{
      question
  })

    return res.json({ question: updatedQuestion, message: 'La pregunta se editó correctamente.' });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }

}
export const destroy =  async (req, res) => {
  const { questionId } = req.params;

try {
  const deletedQuestion = await destroyQuestion(questionId)

  return res.json({ question: deletedQuestion, message: 'La pregunta se eliminó correctamente.' });
} catch (error) {
  return res
    .status(error.status || 500)
    .json(error.message || "Error interno del servidor");
}
}