import 'dotenv/config';


export const environments = {
    APP_PORT: process.env.APP_PORT,
    APP_NAME: process.env.APP_NAME,
    APP_PORT: process.env.APP_PORT,
    APP_URL: process.env.APP_URL,
    DB: {
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_DATABASE: process.env.DB_DATABASE,
        DB_DIALECT: process.env.DB_DIALECT,
        DB_SQLITE_PATH: process.env.DB_SQLITE_PATH
    }
}