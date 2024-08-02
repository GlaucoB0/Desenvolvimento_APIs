import "dotenv/config";
import express from "express";

const PORT = process.env.PORT;

//importar conexão
import conn from "./config/conn.js";
import path from "node:path"
import {fileURLToPath} from "node:url"

//Importação dos modulos (TABELA)
import "./models/usersModel.js";

//importação das rotas
import userRoutes from "./routes/userRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//localizar pasta public
app.use("/public", express.static(path.join(__dirname,"public")))

app.use("/users", userRoutes);

//404
app.use((request, response) => {
  response.status(404).json({ message: "Recurso não encontrado" });
});

app.get("/", (request, response) => {
  response.send("Olá mundo");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta:" + PORT);
});
