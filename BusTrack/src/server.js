import "dotenv/config";
import express from "express";
import conn from "./config/conn.js";

//Importação dos modulos e criação das tabelas
import "./models/linhasModel.js";
import "./models/motoristasModel.js";
import "./models/onibusModel.js";

//Criação das rotas
import motoristasRoutes from "./routes/motoristasRoutes.js";
import linhasRoutes from "./routes/linhasRoutes.js";
import onibusRoutes from "./routes/onibusRoutes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Utilização das rotas
//http://localhost:3333/motoristas
app.use("/motoristas", motoristasRoutes);

//http://localhost:3333/linhas
app.use("/linhas", linhasRoutes);

//http://localhost:3333/onibus
app.use("/onibus", onibusRoutes);

const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.send("Olá, Mundo!");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
