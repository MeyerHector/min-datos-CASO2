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
    timestamps: true,
    underscored: true
})

// servicios
export async function indexSurveys() {
    return await Survey.findAll() ?? null
}

export async function storeSurvey(survey) {
    return await Survey.create(survey)
}

export async function showSurvey(surveyId) {
    return await Survey.findByPk(surveyId) ?? null
}