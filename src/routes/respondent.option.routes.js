import { Router } from "express";
import { respondentAnswers, respondentCount } from "../controllers/respondent.controller.js";

const router = Router();


//api
router.get('/api/respondentOptions', respondentAnswers);
router.get('/api/respondentCount', respondentCount);



export default router;