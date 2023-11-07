import { sequelize } from '../config/database.js'
import { DataTypes } from 'sequelize'


export const GENDERS = {
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
    genderId: {
        type: DataTypes.ENUM([GENDERS.FENEMINO, GENDERS.MASCULINO, GENDERS.NO_BINARIO, GENDERS.OTRO]),
        allowNull: false
    },
    localityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    levelStudyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true
})

// servicio
export async function index() {
    return await Respondent.findAll() ?? null
}

export async function store(respondent) {
    return await Respondent.create(respondent)
}

export async function show(respondentId) {
    return await Respondent.findByPk(respondentId) ?? null
}