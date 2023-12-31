import { sequelize } from '../config/database.js'
import { DataTypes } from 'sequelize'

export const Locality = sequelize.define('Locality', {
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
    return await Locality.findAll({
        order: [['name', 'ASC'],]
    }) ?? null
}

export async function store(locality) {
    return await Locality.create(locality)
}

export async function show(localityId) {
    return await Locality.findByPk(localityId) ?? null
}