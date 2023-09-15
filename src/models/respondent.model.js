import { sequelize } from '../config/database.js'
import { DataTypes } from 'sequelize'


export const GENDER = {
    MASCULINO: 'masculino',
    FENEMINO: 'femenino',
    NO_BINARIO: 'nobinario',
    OTRO: 'otro'
}

export const Respondent = sequelize.define('Respondent', {
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM(GENDER.MASCULINO, GENDER.FENEMINO, GENDER.NO_BINARIO, GENDER.OTRO),
        allowNull: false
    },
    locality: {
        type: DataTypes.STRING,
        defaultValue: 'Formosa'
    }
}, {
    timestamps: true
})

// servicio
export async function index() {
    return await Respondent.findAll() ?? null
}

export async function store(respondent) {
    return await Respondent.create(respondent)
}

export async function show(respondentId) {
    return await respondent.findByPk(respondentId) ?? null
}