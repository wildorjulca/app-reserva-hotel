const express = require("express")
const { registerUsuario, loginUsuario } = require("../controller/authController")
const router =  express.Router()


router.post("/register",registerUsuario)
router.post("/login",loginUsuario)


module.exports = router