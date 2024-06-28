

const mysql = require("mysql2")

exports.coneccion = () => {
    const cn = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            port: 3306,
            password: "",
            database: "db_hotel;",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })
    return cn
}