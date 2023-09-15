
import { sequelize } from '../config/database.js'
import { DataTypes } from 'sequelize'

export const Option = sequelize.define('Option', {
    option: {
        type: DataTypes.STRING,
        allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }  
}, {
    timestamps: true,
    underscored: true
})

// servicio
export async function index() {
    return await Option.findAll() ?? null
}

export async function store(option) {
    return await Option.create(option)
}

export async function show(optionId) {
    return await Option.findByPk(optionId) ?? null
}