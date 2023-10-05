import { indexQuestions } from "../models/question.model.js";
import { indexSurveys } from "../models/survey.model.js";

export const indexView = (req, res) => {
  res.render("surveys/index");
};

export const showView = (req, res) => {
  const surveyId = req.params.surveyId;
  res.render("surveys/show", { surveyId });
};

export const createView = (_req, res) => {
  res.render("surveys/create");
};

export const editView = (req, res) => {
  const surveyId = req.params.id;
  res.render("surveys/edit", { id: surveyId });
};

//APIS
export const index = async (req, res) => {
  try {
    const surveys = await indexSurveys();
    return res.json(surveys);
  } catch (error) {
    console.log(error);
  }
};

export const showQuestions = async (req, res) => {
  console.log(req.params)
  const { surveyId } = req.params;

  

  try {
    const question = await indexQuestions({
      where: {
        surveyId
      }
    });


    if (!question) {
      throw {
        status: 404,
        message: "No existe la pregunta con el id " + surveyId,
      };
    }

    return res.json(question);
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }

};

export const storeQuestion = async (req, res) => {
  console.log(req.body, req.params.surveyId);

  const { question } = req.body;

  const surveyId = req.params.surveyId;

  try {
    const newQuestion = await storeQuestion({
      question,
      surveyId,
    });

    if (!newQuestion) {
      throw {
        status: 400,
        message: "No se pudo crear la pregunta.",
      };
    }

    return res
      .status(201)
      .json({ question: newQuestion, message: "Pregunta creada correctamente." });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

export const store = async (req, res) => {};

export const edit = async (req, res) => {};

export const destroy = async (req, res) => {};
