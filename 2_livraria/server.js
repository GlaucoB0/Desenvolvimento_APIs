import "dotenv/config"
import express from "express";
import mysql from "mysql2"
import {v4 as uuidv4} from "uuid"

const PORT = process.env.PORT

const app = express()

app.use(express.json())

//Criar conexão com o banco de dados MYSQL
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sen@iDev77!.',
    database: 'livraria',
    port: '3306',
})

//Conectar ao banco e dados
conn.connect((err)=>{
    if(err){
        console.error(err.stack)
    }
    console.log("MySql conectado")
    app.listen(PORT, ()=>{
        console.log("Servidor rodando na porta "+ PORT)
    })
})

app.get('/livros', (request, response)=>{
    response.status(200)
})

//Rota 404
app.use((request, response)=>{
    response.status(404).json({msg: "Rota não encontrada"})
})