const {coneccion} = require("../db/conexion")
const cn = coneccion()

const getUsuario =(req,res)=>{
    try {
        cn.query("select * from usuario",(err,result,fields)=>{
            if(err){
                return res.status(400).send(err)
            }else{
                if(result.length>0){
                    return res.status(200).send(result)
                }else{
                    return res.status(201).send({msg: "No  ay usuarios en la base de datos"})
                }
            }
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}
const deleteUsuario =(req,res)=>{
    try {
        cn.query("delete from usuario where idUsuario = ?",req.params.id ,(err,result,fields)=>{
            if(err){
                return res.status(400).send(err)
            }else{
                if(result.affectedRows === 1){
                    return res.status(200).send({msg: "delete user coorect!"})
                }
            }
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}
const updateUsuario =(req,res)=>{
    try {
        const idUsuario= req.params.id
        const {username,email,contrasenia,isAdmin,} = req.body
    const body =[username,email,contrasenia,isAdmin,idUsuario]
        cn.query("update usuario set username = ?, email =?,contrasenia=?,isAdmin=? where idUsuario = ?",body ,(err,result,fields)=>{
            if(err){
                return res.status(400).send(err)
            }else{
                if(result.affectedRows === 1){
                    return res.status(200).send({msg: "upadte user coorect!"})
                }
            }
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}
module.exports = {
    getUsuario,
    deleteUsuario,
    updateUsuario
}