const { Router } = require("express")
const usersController = require("../controllers/users.controller")

const router = Router()

router
    .get("/users", usersController.GET)
    .post("/register", usersController.POST)

module.exports = router    