const { Router } = require('express')
const authController  = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerController)


/**
 * @route POST /api/auth/login
 * @description login a user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginController)


/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add token in blakclist
 * @access public
 */
authRouter.get("/logout", authController.logoutController)


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController )

module.exports = authRouter