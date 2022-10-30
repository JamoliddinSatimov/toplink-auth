const { DataTypes } = require("sequelize")
const sequelize = require("../utils/sequelize")

const verifyEmail = sequelize.define("verify_email", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique:true,
        allowNull:false,
        primaryKey:true
    },
    email: {
        type: DataTypes.TEXT(64),
        allowNull: false
    },
    verifycode: {
        type: DataTypes.TEXT(6),
        allowNull:false
    }
})

module.exports = verifyEmail