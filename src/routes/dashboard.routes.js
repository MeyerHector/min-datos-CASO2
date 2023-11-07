import { Router } from "express";
import { createView } from "../controllers/survey.controllers.js";

const router = Router();


router.get('/', createView)

router.get('/admin', (req, res) => {
    res.render('admin/index')
})




export default router;