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
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    underscored: true
})

// servicios
export async function indexSurveys(options) {
    return await Survey.findAll(options) ?? null
}

export async function storeSurvey(survey) {
    return await Survey.create(survey)
}

export async function updateSurvey(surveyId, data) {
    const survey = await Survey.findByPk(surveyId)
    return await survey.update(data);
}

export async function showSurvey(surveyId) {
    return await Survey.findByPk(surveyId) ?? null
}

export async function showSurveyByAnotherField(options) {
    return await Survey.findOne(options) ?? null
}