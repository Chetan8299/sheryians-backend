const express = require("express");
const authControllers = require("../controllers/auth.controllers")


const authRouter = express.Router();

/**
 * POST /api/auth/register
 */
authRouter.post("/register",authControllers.registerController)

/**
 * POST /api/auth/login
 */
authRouter.post("/login",authControllers.loginController)

module.exports = authRouter