const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
    host: process.env.HOST || 'peanut.db.elephantsql.com',
    port: process.env.PORT ||  5432,
    username: process.env.USERNAME_DB || 'hmkdcscl',
    password: process.PASSWORD_DB || 'RsCQH9NAjCGHDKeHnwGvnw8PTQzjJpV9',
    database: process.DATABASE_DB || 'hmkdcscl',
    dialect: 'postgres'
})

module.exports = sequelize