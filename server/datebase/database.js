const Sequelize = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
})

const Rooms = require('./RoomsTable')(sequelize);

module.exports = {
    sequelize : sequelize,
    rooms : Rooms
}
