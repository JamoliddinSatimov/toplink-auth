require("dotenv").config()
const express = require('express')
const cookieParser = require("cookie-parser")
const sequelize = require("./utils/sequelize")
const router = require("./routes")
const loginRouter = require("./routes/login-route")
const errorHandle = require("./middlewares/errorHandle")
const PORT = process.env.PORT || 7070

const app = express()

app.use(express.json())
app.use(router)
app.use(loginRouter)
app.use(cookieParser())
app.use(errorHandle)



sequelize.authenticate()
.then(() => console.log("Connected"))
.catch(err => console.log(err))

sequelize.sync()


app.listen(PORT, console.log(PORT))