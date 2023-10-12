import { Router } from "express";
import { destroy, edit, editStatus, editView, index, indexView, showView, showQuestions, store, storeQuestions } from "../controllers/survey.controllers.js";


const router = Router();


//vistas
router.get('/surveys', indexView);
router.get('/surveys/:surveyId/show', showView);
router.get('/surveys/:surveyId/edit', editView);


//api
router.get('/api/surveys', index);
router.post('/api/surveys', store);
router.put('/api/surveys/:surveyId/update', edit);
router.delete('/api/surveys/:surveyId/destroy', destroy);

router.patch('/api/surveys/:surveyId/updateStatus', editStatus)

// ENCUESTA // PREGUNTAS
router.get('/api/surveys/:surveyId/questions', showQuestions);
router.post('/api/surveys/:surveyId/questions', storeQuestions);



export default router;