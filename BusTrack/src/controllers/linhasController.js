import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getLinhas = (request, response) => {
  const sql = `SELECT * FROM linhas`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ msg: "Erro ao buscar linhas" });
      return;
    }
    const linhas = data;
    response.status(200).json(linhas);
  });
};

export const postLinha = (request, response) => {
  const { nome_linha, numero_linha, itinerario } = request.body;

  if (!nome_linha) {
    response.status(400).json({ message: "O nome da linha é obrigatório!" });
    return;
  }
  if (!numero_linha) {
    response.status(400).json({ message: "O numero_linha é obrigatório!" });
    return;
  }
  if (!itinerario) {
    response.status(400).json({ message: "O itinerario é obrigatório!" });
    return;
  }

  const checkSql = /*sql*/ `
    SELECT * FROM linhas 
    WHERE ?? = ? AND 
    ?? = ? AND 
    ?? = ?
    `;
  const checkSqlData = [
    "nome_linha",
    nome_linha,
    "numero_linha",
    numero_linha,
    "itinerario",
    itinerario,
  ];

  conn.query(checkSql, checkSqlData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar as linhas" });
      return console.log(err);
    }
    if (data.length > 0) {
      response
        .status(409)
        .json({ message: "Linha já cadastrado na base de dados" });
      return console.log(err);
    }

    const insertSql = /*sql*/ `
      INSERT INTO linhas( ??, ??, ??) VALUES (?,?,?);
      `;

    const insertData = [
      "nome_linha",
      "numero_linha",
      "itinerario",
      nome_linha,
      numero_linha,
      itinerario,
    ];

    conn.query(insertSql, insertData, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastrar a linha" });
        return console.log(err);
      }
      response.status(201).json({ message: "linha cadastrada" });
    });
  });
};

export const buscarLinha = (request, response) => {
  const { id } = request.params;

  const sql = /*sql*/ `SELECT * FROM linhas WHERE ?? = ?`;
  const insertData = ["linha_id", id];

  conn.query(sql, insertData, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ msg: "Erro ao  buscar linha" });
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ msg: "linha não encontrada" });
      return;
    }
    response.status(200).json(data);
  });
};

export const editarLinha = (request, response) => {
  const { id } = request.params;
  const { nome_linha, numero_linha, itinerario } = request.body;

  if (!nome_linha) {
    response.status(400).json({ message: "O nome da linha é obrigatório!" });
    return;
  }
  if (!numero_linha) {
    response.status(400).json({ message: "O numero_linha é obrigatório!" });
    return;
  }
  if (!itinerario) {
    response.status(400).json({ message: "O itinerario é obrigatório!" });
    return;
  }

  //consultas
  const checkSql = /*sql*/ `SELECT * FROM livros WHERE ?? = ?`;
  const insertData = ["livro_id", id];
  conn.query(checkSql, insertData, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ msg: "Erro ao buscar livros" });
      return;
    }
    if (data.length === 0) {
      return response.status(404).json({ msg: "linha não encontrado" });
    }

    //Consulta SQL para atualizar linha
    const upadateSql = /*sql*/ `UPDATE linhas SET
      ?? = ?, ?? = ?, ?? = ?
      WHERE ?? = ?`;

    const checkSqlData = [
      "nome_linha",
      nome_linha,
      "numero_linha",
      numero_linha,
      "itinerario",
      itinerario,
      "linha_id",
      id,
    ];

    conn.query(upadateSql, checkSqlData, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ msg: "Erro ao atualizar linha" });
        return;
      }
      response.status(200).json({ msg: "linha atualizado" });
    });
  });
};
