import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getAllOnibus = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM onibus`;

  conn.query(sql, (err, data, rows) => {
    console.log(rows);
    if (err) {
      console.error(err);
      response.status(500).json({ msg: "Erro ao listar onibus" });
      return;
    }
    response.status(200).json(data);
  });
};

export const postOnibus = (request, response) => {
  const { placa, modelo, ano_fabricacao, capacidade, id_linha, id_motorista } =
    request.body;

  if (!placa) {
    response.status(400).json({ message: "O placa é obrigatório!" });
    return;
  }
  if (!modelo) {
    response.status(400).json({ message: "O modelo é obrigatório!" });
    return;
  }
  if (!ano_fabricacao) {
    response.status(400).json({ message: "O ano_fabricacao é obrigatório!" });
    return;
  }
  if (!capacidade) {
    response.status(400).json({ message: "O capacidade é obrigatório!" });
    return;
  }
  if (!id_linha) {
    response.status(400).json({ message: "O id_linha é obrigatório!" });
    return;
  }
  if (!id_motorista) {
    response.status(400).json({ message: "O id_motorista é obrigatório!" });
    return;
  }

  const checkSql = /*sql*/ `SELECT * FROM onibus WHERE ?? = ?`;
  const checkInsertSql = ["placa", placa];
  conn.query(checkSql, checkInsertSql, (err, data) => {
    if (data.length > 0) {
      response.status(400).json({ msg: "onibus já existe" });
      return;
    }

    const sql = /*sql*/ `
      INSERT INTO onibus(??,??,??,??,??, ??)
      VALUES(?,?,?,?,?,?)
      `;
    const insertData = [
      "placa",
      "modelo",
      "ano_fabricacao",
      "capacidade",
      "id_linha",
      "id_motorista",
      placa,
      modelo,
      ano_fabricacao,
      capacidade,
      id_linha,
      id_motorista,
    ];

    conn.query(sql, insertData, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ msg: "Erro ao cadatrar onibus" });
        return;
      }
      response.status(201).json({ msg: "criado" });
    });
  });
};

export const buscarOnibus = (request, response) => {
  const { id } = request.params;

  const sql = /*sql*/ `SELECT * FROM onibus WHERE ?? = ?
  `;
  const insertData = ["onibus_id", id];

  conn.query(sql, insertData, (err, data) => {
    if (data.length === 0) {
      response.status(404).json({ msg: "onibus não existe" });
      return;
    }

    const sql2 = /*sql*/ `SELECT nome_linha, numero_linha, itinerario FROM linhas WHERE ?? = ?;
      `;
    const insertData = ["linha_id", data[0].id_linha];

    conn.query(sql2, insertData, (err, linha) => {
      if (linha.length === 0) {
        response.status(404).json({ msg: "linha não existe" });
        return;
      }

      const sql3 = /*sql*/ `SELECT nome, numero_carteira_habilitacao, data_nascimento  FROM motoristas WHERE ?? = ?`;
      const insertData = ["motorista_id", data[0].id_motorista];

      conn.query(sql3, insertData, (err, motorista) => {
        if (motorista.length === 0) {
          response.status(404).json({ msg: "motorista não existe" });
          return;
        }
        data[0].id_linha = linha;
        data[0].id_motorista = motorista;
        response.status(200).json(data);
      });
    });
  });
};
