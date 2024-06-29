
const express = require("express")
const { getUsuario, deleteUsuario, updateUsuario } = require("../controller/userController")
const { verifyToken, verifyisAdmin } = require("../helpers/verifyToken")
const router = express.Router()

router.get("/getUsuario",verifyToken,getUsuario)
router.get("/getUsuariopruba/:id",verifyisAdmin,(req,res)=>{
    return res.status(200).send({msg: "uusiario eliminando y provando la prueba del token"})
})

router.delete("/deleteUsuario/:id",deleteUsuario)
router.put("/updateUsuario/:id",updateUsuario)




module.exports = router

