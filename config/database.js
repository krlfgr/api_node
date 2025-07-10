const { Sequelize } = require('sequelize')
require("dotenv").config(); //cargar las variables de entorno


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASDWORD,
    {
        host:process.env.HOST,
        dialect:'protgres'
    }
)

module.exports = sequelize;