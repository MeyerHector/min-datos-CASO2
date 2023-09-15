import { sequelize } from '../config/database.js'
import { DataTypes } from 'sequelize'

export const Survey = sequelize.define('Survey', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true
})

// servicio
export async function index() {
    return await Survey.findAll() ?? null
}

export async function store(survey) {
    return await Survey.create(survey)
}

export async function show(surveyId) {
    return await Survey.findByPk(surveyId) ?? null
}