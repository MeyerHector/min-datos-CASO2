import { Router } from "express";
import { destroyQuestionOptions, editQuestionOptions, indexQuestOptions,  storeQuestionOptions } from "../controllers/question.option.controller.js";



const router = Router();


//api
router.get('/api/questions/:questionId/options', indexQuestOptions);
router.post('/api/questions/:questionId/options', storeQuestionOptions);
router.put('/api/questions/:questionId/options/:optionId/update', editQuestionOptions);
router.delete('/api/questions/:questionId/options/:optionId/destroy', destroyQuestionOptions);


export default router;