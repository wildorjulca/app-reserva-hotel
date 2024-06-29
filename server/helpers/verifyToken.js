const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyToken = (req, res, next) => {
    const token = req.cookies.acces_token
    if (!token) return res.status(400).send({ msg: "Por seguridad no esta autorizado" })
    try {
        jwt.verify(token, process.env.CLAVE_SECRET_TOKEN, (err, user) => {
            if (err) {
                return res.status(400).send({ msg: "Usuario no autorizado" })
            } else {
                req.user = user
                next()
            }
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}
const verifyisAdmin =(req,res,next)=>{
    verifyToken(req,res,(err)=>{
        if(err) return res.status(400).send(err)
        if(req.user.isAdmin === 1 && req.user.id == req.params.id){
            next()
        }else{
            return res.status(400).send({msg: "Solo administradores pueden hacer estas piticiones"})
        }
    })
}

module.exports  ={
    verifyToken,
    verifyisAdmin
}