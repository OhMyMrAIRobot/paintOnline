const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../Database')

const Room = sequelize.define('Room', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    Session : {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
    },
    Canvas: {
        type: DataTypes.TEXT("long"),
        allowNull: true
    }
    }, {
        timestamps: false,
    }
    );

module.exports = Room;