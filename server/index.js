const express = require("express")
require("dotenv").config()
const cookiee = require("cookie-parser")
const app = express()

// Midllawers
app.use(express.json())
app.use(cookiee())
app.use("/api/auth/",require("./routers/authRouter"))
app.use("/api/usuario/", require("./routers/userRouter"))

app.use((err,req,res,next)=>{
    const messageError = err.message  | "Error de servidor"
    const statusError = err.status || 500
    const succes = false

    return res.status(statusError).json({
        status: statusError,
        message: messageError,
        succes:succes,
        stack : err.stack
    })
})

app.listen(process.env.PORT,()=>{
    console.log("https//localhost/:"+process.env.PORT)
})