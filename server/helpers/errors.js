
const createErrors =(status,message)=>{
    const error = new Error()
    error.status = status
    error.message = message
    return error
}

module.exports = {createErrors}