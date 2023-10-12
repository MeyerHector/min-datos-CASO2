import { Router } from "express";
import { destroy, edit, showView } from "../controllers/question.controller.js";


const router = Router();

//VISTAS
router.get('/questions/:questionId/show', showView)

//api
router.put('/api/questions/:questionId/update', edit);
router.delete('/api/questions/:questionId/destroy', destroy);


export default router;