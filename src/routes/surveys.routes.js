import { Router } from "express";
import { indexView } from "../controllers/survey.controllers.js";

const router = Router();


//vistas
router.get('/surveys', indexView);


//api




export default router;