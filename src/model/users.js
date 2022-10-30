const { DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")

const usersModel = sequelize.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique:true,
        primaryKey: true,
        allowNull:false
    },
    fullname: {
        type: DataTypes.TEXT(64),
        allowNull: false
    },
    phone: {
        type: DataTypes.TEXT(32),
        allowNull:false,
        unique:true
    },
    email: {
        type: DataTypes.TEXT(64),
        allowNull:false,
        unique:true
    },
    password: {
        type: DataTypes.TEXT(255),
        allowNull:false
    },
    username: {
        type: DataTypes.TEXT(64),
        allowNull:false,
        unique: true
    },
})

module.exports = usersModel