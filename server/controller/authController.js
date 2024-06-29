

const { coneccion } = require("../db/conexion")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookiee = require("cookie-parser")
require("dotenv").config()
const { createErrors } = require("../helpers/errors")
const cn = coneccion()


const registerUsuario = (req, res, next) => {
    const salt = bcrypt.genSaltSync(10)
    const contrasenia = bcrypt.hashSync(req.body.contrasenia, salt)

    const { username, email } = req.body


    const body = [username, email, contrasenia]
    try {
        cn.query("insert into usuario(username,email,contrasenia) values(?,?,?)", body, (err, result, fiels) => {
            if (err) {
                return res.status(400).send(err)
            } else {
                if (result.affectedRows === 1) {
                    return res.status(201).send("user save correct")
                }
            }
        })
    } catch (error) {
        next(createErrors(500, error))
    }
}
const loginUsuario = async (req, res) => {
    try {
        cn.query("select * from usuario  where username = ?", req.body.username, async (err, result, fields) => {
            if (err) {
                return res.status(400).send(err)
            } else {
                if (result.length > 0) {
                    const contrasenia = result[0].contrasenia
                    const compareContrasenia = await bcrypt.compare(req.body.contrasenia, contrasenia)

                    if (!compareContrasenia) {
                        return res.status(400).send({ msg: "Password incorrectas" })
                    } else {
                        const token = jwt.sign({ id: result[0].id, username: result[0].username, isAdmin: result[0].isAdmin }, process.env.CLAVE_SECRET_TOKEN)
                        res.cookie("acces_token",token)
                        return res.status(200).send({ msg: "Binevenido al sistema", result })
                    }
                } else {
                    return res.status(400).send({ msg: "Usernname incorrect" })
                }
            }
        })

    } catch (error) {
        return res.status(500).send(error)
    }


}
module.exports = {
    registerUsuario,
    loginUsuario
}