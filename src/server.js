require("dotenv").config()
const express = require('express')
const sequelize = require("./utils/sequelize")
const router = require("./routes")
const loginRouter = require("./routes/login-route")
const errorHandle = require("./middlewares/errorHandle")
const swaggerUI = require('swagger-ui-express')
const doc = require('../swagger.json')
const PORT = process.env.PORT || 7070

const app = express()

app.use(express.json())
app.use('/api', swaggerUI.serve, swaggerUI.setup(doc))
app.use(router)
app.use(loginRouter)
app.use(errorHandle)

sequelize.authenticate()
.then(() => console.log("Connected"))
.catch(err => console.log(err))

sequelize.sync()

app.use("/*", (req, res) => {
    res.json({
        success:false,
        message: "url invalid"
    })
})


app.listen(PORT, console.log(PORT))