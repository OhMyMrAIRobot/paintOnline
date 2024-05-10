const Sequelize = require("sequelize");
const fs = require('fs');

const data = fs.readFileSync("./config/config.json");
const config = JSON.parse(data);
const dbConfig = config.development;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    port: dbConfig.port,
    logging: false,
});

module.exports = sequelize;