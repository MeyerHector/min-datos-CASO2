import { sequelize } from '../config/database.js'
import { DataTypes } from 'sequelize'

export const LevelStudy = sequelize.define('LevelStudy', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    underscored: true
})

// servicios
export async function index() {
    return await LevelStudy.findAll() ?? null
}

export async function store(levelStudy) {
    return await LevelStudy.create(levelStudy)
}

export async function show(levelStudyId) {
    return await LevelStudy.findByPk(levelStudyId) ?? null
}