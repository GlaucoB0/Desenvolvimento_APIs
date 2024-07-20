import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getClientes = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM clientes`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ msg: "Erro ao listar clientes" });
      return;
    }
    response.status(200).json(data);
  });
};

export const postClientes = (request, response) => {
  const { nome, senha, email, imagem } = request.body;

  if (!nome) {
    response.status(400).json({ message: "O nome é obrigatório!" });
    return;
  }
  if (!senha) {
    response.status(400).json({ message: "O senha é obrigatório!" });
    return;
  }
  if (!email) {
    response.status(400).json({ message: "O email é obrigatório!" });
    return;
  }
  const checkSql = /*sql*/ `SELECT * FROM clientes WHERE email = "${email}"`;
  conn.query(checkSql, (err, data) => {
    if (data.length > 0) {
      response.status(400).json({ msg: "cliente já existe" });
      return;
    }
    const id = uuidv4();
    const sql = /*sql*/ `
        INSERT INTO clientes(id, nome, senha, imagem, email)
        VALUES("${id}","${nome}","${senha}","${imagem}","${email}")
        `;

    conn.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ msg: "Erro ao cadatrar cliente" });
        return;
      }
      response.status(201).json({ msg: "criado" });
    });
  });
};

export const buscarCliente = (request, response) => {
  const { id } = request.params;

  const sql = /*sql*/ `SELECT * FROM clientes WHERE id = "${id}"`;
  conn.query(sql, (err, data) => {
    if (data.length === 0) {
      response.status(404).json({ msg: "cliente não existe" });
    }
    response.status(200).json(data);
  });
};

export const editarCliente = (request, response) => {
  const { id } = request.params;
  const { nome, senha, email, imagem } = request.body;

  if (!nome) {
    response.status(400).json({ message: "O nome é obrigatório!" });
    return;
  }
  if (!senha) {
    response.status(400).json({ message: "O senha é obrigatório!" });
    return;
  }
  if (!email) {
    response.status(400).json({ message: "O email é obrigatório!" });
    return;
  }

  const checkSql = /*sql*/ `SELECT * FROM clientes WHERE id = "${id}"`;
  conn.query(checkSql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ msg: "Erro ao buscar cliente" });
      return;
    }
    if (data.length === 0) {
      return response.status(404).json({ msg: "cliente não encontrado" });
    }

    //Consulta SQL para atualizar livro
    const upadateSql = /*sql*/ `UPDATE clientes SET
        nome = "${nome}", senha = "${senha}", 
        imagem = "${imagem}", email = "${email}"
        WHERE id = "${id}"`;

    conn.query(upadateSql, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ msg: "Erro ao atualizar cliente" });
        return;
      }
      response.status(200).json({ msg: "cliente atualizado" });
    });
  });
};
