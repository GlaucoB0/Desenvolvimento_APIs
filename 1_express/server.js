import express from "express"

const PORT = 3333

const app = express()

//Aceitar JSON
app.use(express.json())

//Rotas
/** Request HTTP
 * query params - ...:3333/pessoas?nome="Carlos"&idade=32
 *  Rotas do tipo GET (filtros e buscas)
 * route params - ...:3333/pessoas/5
 *  Rotas do tipo GET, PUT, PATCH, DELETE(listar um elemento)
 * body params - ...:3333/pessoas
 *  Rotas do tipo POST (Cadastro de informações)
 * 
 */
//Query Params
app.get("/users", (request, response)=>{
    //const query = request.query
    const {nome, idade} = request.query
    console.log(nome, idade)
    response.status(200).json([
        "Pessoa 1",
        "Pessoa 2",
        "Pessoa 3"
    ])
})

app.post("/users", (request, response)=>{
    const body = request.body
    console.log(body)
    response.status(201).json([
        "Pessoa 1",
        "Pessoa 2",
        "Pessoa 3",
        "Pessoa 4"
    ])
})

//Routes Params
app.put("/users/:id/:cpf", (request, response)=>{
    //const params = request.params
    //console.log(params)
    // const id = request.params.id
    // const cpf = request.params.cpf
    const {id, cpf} = request.params
    console.log(id, cpf)
    response.status(200).json([
        "Pessoa 1",
        "Pessoa 10",
        "Pessoa 3",
        "Pessoa 4"
    ])
})

app.delete("/users", (request, response)=>{
    response.status(200).json([
        "Pessoa 10",
        "Pessoa 3",
        "Pessoa 4"
    ])
})

app.listen(PORT, ()=>{
    console.log("Server on PORT "+PORT)
})
