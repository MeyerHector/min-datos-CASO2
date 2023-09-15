import express from "express";
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import path from 'path';

import { environments } from "./src/config/environments.js";
import { startDb } from "./src/config/database.js";
import './src/models/associations.js';
import surveyRoutes from "./src/routes/surveys.routes.js";

import dashboardRoutes from "./src/routes/dashboard.routes.js";

import fileDirName from './src/utils/file-dir-name.js';
const { __dirname } = fileDirName(import.meta);

const app = express();


//configuración del ejs
app.set("views", path.join(__dirname, "src/views"));
app.set('view engine', 'ejs');

app.use(express.static('public'));

//middlewares
app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}))
app.use(morgan('dev'))
app.use(helmet())

//routes

app.use('/',dashboardRoutes);
app.use('/',surveyRoutes);


app.use(function (req, res) {
    res.status(404).render("errors/404.ejs");
});


app.listen(environments.APP_PORT, () => {
    console.log(`Servidor en ${environments.APP_URL}:${environments.APP_PORT}`);
    startDb();
});


