import express from "express";
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import path from 'path';

import { environments } from "./src/config/environments.js";
import { startDb } from "./src/config/database.js";
import './src/models/associations.js';

import surveyRoutes from "./src/routes/surveys.routes.js";
import questionRoutes from "./src/routes/question.routes.js";
import questionOptionRoutes from "./src/routes/question.option.routes.js";
import dashboardRoutes from "./src/routes/dashboard.routes.js";
import localityRoutes from "./src/routes/localities.routes.js";

import fileDirName from './src/utils/file-dir-name.js';
const { __dirname } = fileDirName(import.meta);

const app = express();


//configuración del ejs
app.set("views", path.join(__dirname, "src/views"));
app.set('view engine', 'ejs');
//Carpeta public para archivos estaticos
app.use(express.static(path.join(__dirname, "src/public")));


//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
// app.use(helmet())

//routes

app.use('/',dashboardRoutes);
app.use('/',surveyRoutes);
app.use('/',questionRoutes);
app.use('/',questionOptionRoutes);
app.use('/',localityRoutes);


app.use(function (req, res) {
    res.status(404).render("errors/404.ejs");
});


app.listen(environments.APP_PORT, () => {
    console.log(`Servidor en ${environments.APP_URL}:${environments.APP_PORT}`);
    startDb();
});


