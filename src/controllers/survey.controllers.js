import {
  Question,
  indexQuestions,
  storeQuestion,
} from "../models/question.model.js";
import {
  indexSurveys,
  showSurvey,
  showSurveyByAnotherField,
  storeSurvey,
  updateSurvey,
} from "../models/survey.model.js";

import { Option } from "../models/option.model.js";
import { Respondent } from "../models/respondent.model.js";
import { QuestionRespondent } from "../models/question.respondent.model.js";
import { sequelize } from "../config/database.js";

export const indexView = (req, res) => {
  res.render("admin/surveys/index");
};

export const showView = async (req, res) => {
  const surveyId = req.params.surveyId;

  const survey = await showSurvey(surveyId);

  res.render("admin/surveys/show", { surveyId, survey });
};

export const createView = (_req, res) => {
  res.render("admin/surveys/create");
};

export const editView = (req, res) => {
  const surveyId = req.params.id;
  res.render("admin/surveys/edit", { id: surveyId });
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
  console.log(req.params);
  const { surveyId } = req.params;

  try {
    const question = await indexQuestions({
      where: {
        surveyId,
      },
      include: Option,
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

export const storeQuestions = async (req, res) => {
  console.log(req.body, req.params);

  const surveyId = req.params.surveyId;
  const { question } = req.body;

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

    return res.status(201).json({
      question: newQuestion,
      message: "Pregunta creada correctamente.",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

export const store = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newSurvey = await storeSurvey({
      title,
      description,
    });

    if (!newSurvey) {
      throw {
        status: 400,
        message: "No se pudo crear la encuesta.",
      };
    }

    return res
      .status(201)
      .json({ survey: newSurvey, message: "Encuesta creada correctamente." });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

export const edit = async (req, res) => {
  const { surveyId } = req.params;
  const { title, description } = req.body;

  try {
    const updatedSurvey = await updateSurvey(surveyId, { title, description });

    return res.json({
      survey: updatedSurvey,
      message: "La encuesta se editó correctamente.",
    });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

export const editStatus = async (req, res) => {
  const { surveyId } = req.params;
  const { status } = req.body;

  try {
    const oldActiveSurvey = await showSurveyByAnotherField({
      where: {
        status: true,
      },
    });
    if (oldActiveSurvey) {
      oldActiveSurvey.status = false;
      oldActiveSurvey.save();
    }

    const newActiveSurvey = await updateSurvey(surveyId, { status: !status });

    return res.json({
      survey: newActiveSurvey,
      message: "La encuesta se editó correctamente.",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

export const storeQuestionsOptions = async (req, res) => {
  const {
    age,
    gender,
    levelStudy,
    localities,
    gustaMusica,
    generoMusical,
    imprescindibleMusica,
    importanciaCancion,
    gustosCambiantes,
    tiempoMusicaDia,
    momentoFavorito,
    generoNoGusta,
    artistaFavorito, //CAMPO OPEN
    cancionFavorita, //CAMPO OPEN
    comentariosAdicionales, //CAMPO OPEN
  } = req.body;

  const options = [
    gustaMusica,
    generoMusical,
    imprescindibleMusica,
    importanciaCancion,
    gustosCambiantes,
    tiempoMusicaDia,
    momentoFavorito,
    generoNoGusta,
  ];

  const questions = [artistaFavorito, cancionFavorita, comentariosAdicionales];

  console.log(req.body);


  const t = await sequelize.transaction();

  try {
    const respondent = await Respondent.create({
      age,
      genderId: gender,
      localityId: localities,
      levelStudyId: levelStudy,
    });

    // await amidala.addProfile(queen, { through: { selfGranted: false } });

    options.forEach(async (op) => {
      const option = await Option.findByPk(op);
      await respondent.addOption(option);
    });

    questions.forEach(async (q) => {
      const question = await Question.findByPk(q.idQuestion);
      await respondent.addQuestion(question, {
        through: { respondentResponse: q.value },
      });
    });

    t.commit();

    return res.json({
      status: 201
    });
  } catch (error) {
    await t.rollback();
    console.log('error on storeQuestionsOptions')
    console.log(error)
    return res.json({
      status: error.status || 500,
      message: error.message || 'error inesperado.'
    });
  }
};

export const destroy = async (req, res) => {};
