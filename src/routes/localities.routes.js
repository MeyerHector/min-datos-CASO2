

import { Router } from "express";
import { indexLocalities } from "../controllers/locality.controller.js";


const router = Router();



//api
router.get('/api/localities', indexLocalities);

export default router;