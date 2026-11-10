const { Router } = require('express')
const authController  = require("../controllers/auth.controller")

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.resgisterController)

module.exports = authRouter