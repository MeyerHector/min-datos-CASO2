import { sequelize } from '../config/database.js'
import { DataTypes } from 'sequelize'

export const Question = sequelize.define('Question', {
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }  
}, {
    timestamps: true,
    underscored: true
})

// servicio
export async function index() {
    return await Question.findAll() ?? null
}

export async function store(question) {
    return await Question.create(question)
}

export async function show(questionId) {
    return await Question.findByPk(questionId) ?? null
}