import { Router } from "express";
import { index, indexView } from "../controllers/survey.controllers.js";

const router = Router();


//vistas
router.get('/surveys', indexView);


//api
router.get('/api/surveys', index);




export default router;