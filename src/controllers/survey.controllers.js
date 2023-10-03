import { indexSurveys } from "../models/survey.model.js";

export const indexView = (req, res) => {
    res.render('surveys/index')
}

export const showView = (req, res) => {
    const surveyId = req.params.id;
    res.render('surveys/show', { id: surveyId });
  };
  
export const createView = (_req, res) => {
    res.render('surveys/create');
  };
  
export const editView = (req, res) => {
    const surveyId = req.params.id;
    res.render('surveys/edit', { id: surveyId });
  };

//APIS
export const index = async (req, res) => {

  try {
    const surveys = await indexSurveys();
    return res.json(surveys)
  } catch (error) {
    console.log(error);
  }

}