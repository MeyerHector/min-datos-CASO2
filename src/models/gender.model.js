import { sequelize } from '../config/database.js'
import { DataTypes } from 'sequelize'

export const Gender = sequelize.define('Gender', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

// servicios
export async function index() {
    return await Gender.findAll() ?? null
}

export async function store(gender) {
    return await Gender.create(gender)
}

export async function show(genderId) {
    return await Gender.findByPk(genderId) ?? null
}