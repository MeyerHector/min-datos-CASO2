import { Sequelize } from 'sequelize'
import { environments } from './environments.js'

export const sequelize = new Sequelize(
  environments.DB.DB_DATABASE,
  environments.DB.DB_USER,
  environments.DB.DB_PASS,
  {
    dialect: environments.DB.DB_DIALECT,
    storage: environments.DB.DB_SQLITE_PATH
  }
)

export async function startDb () {
  try {
    await sequelize.sync({ force: false });
    console.log('La conexión a la base de datos fue exitosa.');
  } catch (error) {
    console.log("Ocurrió un error inesperado: ", error)
  }
}