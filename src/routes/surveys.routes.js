import { Router } from "express";
import { destroy, edit, editStatus, editView, index, indexView, showView, showQuestions, store, storeQuestions, storeQuestionsOptions } from "../controllers/survey.controllers.js";


const router = Router();


//vistas
router.get('/admin/surveys', indexView);
router.get('/admin/surveys/:surveyId/show', showView);
router.get('/admin/surveys/:surveyId/edit', editView);


//api
router.get('/api/surveys', index);
router.post('/api/surveys', store);
router.post('/api/surveys/store', storeQuestionsOptions);
router.put('/api/surveys/:surveyId/update', edit);
router.delete('/api/surveys/:surveyId/destroy', destroy);

router.patch('/api/surveys/:surveyId/updateStatus', editStatus)

// ENCUESTA // PREGUNTAS
router.get('/api/surveys/:surveyId/questions', showQuestions);
router.post('/api/surveys/:surveyId/questions', storeQuestions);



export default router;