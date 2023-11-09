import { Router } from "express";
import { respondentAnswers } from "../controllers/respondent.controller.js";

const router = Router();


//api
router.get('/api/respondentOptions', respondentAnswers);



export default router;