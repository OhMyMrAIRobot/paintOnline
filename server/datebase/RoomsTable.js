const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define("Rooms", {
        Id: {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            defaultValue: 0
        },
        Session : {
            type: Sequelize.STRING(256),
        },
        Canvas: {
            type: Sequelize.TEXT("long"),
            allowNull: true
        }
    }, {
        timestamps: false,
    });
}