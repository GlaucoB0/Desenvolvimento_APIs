import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getMotoristas = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM motoristas`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ msg: "Erro ao listar motoristas" });
      return;
    }
    response.status(200).json(data);
  });
};

export const postMotorista = (request, response) => {
  const { nome, data_nascimento, numero_carteira_habilitacao } = request.body;

  if (!data_nascimento) {
    response.status(400).json({ message: "a data_nascimento é obrigatório!" });
    return;
  }
  if (!numero_carteira_habilitacao) {
    response
      .status(400)
      .json({ message: "O numero_carteira_habilitacao é obrigatório!" });
    return;
  }
  if (!nome) {
    response.status(400).json({ message: "o nome é obrigatório!" });
    return;
  }

  const checkSql = /*sql*/ `SELECT * FROM motoristas WHERE ?? = ?`;
  const insertCheckSql = [
    "numero_carteira_habilitacao",
    numero_carteira_habilitacao,
  ];

  conn.query(checkSql, insertCheckSql, (err, data) => {
    if (data.length > 0) {
      response.status(400).json({ msg: "motorista já existe" });
      return;
    }
    const sql = /*sql*/ `
        INSERT INTO motoristas(??, ??, ??)
        VALUES(?, ?, ?)
        `;
    const insertSql = [
      "nome",
      "data_nascimento",
      "numero_carteira_habilitacao",
      nome,
      data_nascimento,
      numero_carteira_habilitacao,
    ];

    conn.query(sql, insertSql, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ msg: "Erro ao cadatrar Motorista" });
        return;
      }
      response.status(201).json({ msg: "criado" });
    });
  });
};

export const buscarMotorista = (request, response) => {
  const motorista_id = request.params.id;

  const sql = /*sql*/ `SELECT * FROM motoristas WHERE ?? = ?`;
  const insertSql = ["motorista_id", motorista_id];

  conn.query(sql, insertSql, (err, data) => {
    if (data.length === 0) {
      response.status(404).json({ msg: "Funcionario não existe" });
      return;
    }
    response.status(200).json(data);
  });
};

export const deletarMotorista = (request, response) => {
  const { id } = request.params;

  const deleteSql = /*sql*/ `DELETE FROM funcionarios WHERE id = "${id}"`;
  conn.query(deleteSql, (err, info) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "Erro ao deletar funcionário" });
      return;
    }

    if (info.affectedRows === 0) {
      response.status(404).json({ message: "Funcionário não encontrado" });
      return;
    }

    response
      .status(204)
      .json({ message: "Funcionário selecionado foi deletado" });
  });
};
