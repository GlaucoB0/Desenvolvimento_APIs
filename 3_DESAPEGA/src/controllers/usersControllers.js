import conn from "../config/conn.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

// Helpers
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
import jwt from "jsonwebtoken";
import getUserByToken from "../helpers/get-user-by-token.js";

export const register = (request, response) => {
  const { nome, email, telefone, senha, confirmsenha } = request.body;

  const checkEmailSQL = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`;
  const checkEmailData = ["email", email];

  conn.query(checkEmailSQL, checkEmailData, async (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ err: "Não foi possível buscar usuário" });
      return;
    }

    if (data.length > 0) {
      response.status(409).json({ message: "Email já está em uso!" });
      return;
    }

    //criar a senha do usuario
    const salt = await bcrypt.genSalt(12); // instrução asíncrona, precisa esperar receber algo para construir
    const senhaHash = await bcrypt.hash(senha, salt);
    // console.log(salt) // 12 para evitar que existam senhas iguas no banco de dados
    // console.log("Senha recebida: ", senha)
    // console.log("Senha Criptografada: ", senhaHash)

    // CADASTRAR USUÁRIO
    const id = uuidv4();
    const imagem = "userDefault.png";

    const insertSql = /*sql*/ `insert into usuarios(??, ??, ??, ??, ??, ??)
        values(?, ?, ?, ?, ?, ?)`;

    const insertData = [
      "usuario_id",
      "nome",
      "email",
      "telefone",
      "senha",
      "imagem",
      id,
      nome,
      email,
      telefone,
      senhaHash,
      imagem,
    ];

    conn.query(insertSql, insertData, (err) => {
      if (err) {
        console.error(err);
        response.status(500).json({ err: "Erro ao cadastrar usuário" });
        return;
      }
      const usuarioSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`;
      const usuarioData = ["usuario_id", id];
      conn.query(usuarioSql, usuarioData, async (err, data) => {
        if (err) {
          console.error(err);
          response.status(500).json({ err: "Erro ao cadastrar usuario" });
          return;
        }
        const usuario = data[0];

        try {
          await createUserToken(usuario, request, response);
        } catch (error) {
          console.error(error);
        }
      });
      // Usuário esteja logado na aplicação
      //createUserToken()
    });
  });
};

// Login
export const login = (request, response) => {
  const { email, senha } = request.body;

  // Validações
  if (!email) {
    response.status(400).json({ err: "O email é obrigatorio" });
    return;
  }
  if (!senha) {
    response.status(400).json({ err: "O senha é obrigatorio" });
    return;
  }

  const checkSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`;
  const checkData = ["email", email];
  conn.query(checkSql, checkData, async (err, data) => {
    if (err) {
      response.status(400).json({ err: "erro ao fazer o login" });
      return;
    }

    if (data.length === 0) {
      response.status(404).json({ err: "usuario não encontrado!" });
      return;
    }

    const usuario = data[0];

    // Verificar se a senha existe/comparar senha
    const compararSenha = await bcrypt.compare(senha, usuario.senha);

    // console.log("Senha do usuario:", senha)
    // console.log("Senha do objeto:", usuario.senha)
    // console.log("comparar senha:", compararSenha)
    if (!compararSenha) {
      return response.status(401).json({ msg: "Senha invalida!" });
    }
    try {
      await createUserToken(usuario, request, response);
    } catch (error) {
      console.error(error);
      response.status(500).json({ err: "Erro ao processar informação" });
    }
  });
};

// Check User
export const checkUser = (request, response) => {
  let usuarioAtual;

  // Criar um helper para fazer a verificação
  if (request.headers.authorization) {
    const token = getToken(request);

    const decoded = jwt.decode(token, "SENHASUPERSEGURAEDIFICIL");

    const usuarioId = decoded.id;

    const checkSql = /*sql*/ `
      SELECT * FROM usuarios WHERE ?? = ?
    `;
    const checkData = ["usuario_id", usuarioId];
    conn.query(checkSql, checkData, (err, data) => {
      if (err) {
        console.error(err);
        response.status(500).json({ msg: "Erro ao verificar usuario" });
        return;
      }
      usuarioAtual = data[0];
      response.status(200).json(usuarioAtual);
    });
  } else {
    usuarioAtual = null;
    response.status(200).json(usuarioAtual);
  }
};

export const getUserById = (request, response) => {
  const { id } = request.params;

  const checkSql = /*sql*/ `
    SELECT usuario_id, nome, email, telefone, imagem
    FROM usuarios
    WHERE ?? = ?
  `;
  const checkData = ["usuarios_id", id];

  conn.query(checkSql, checkData, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ msg: "Erro ao buscar usuario" });
      return;
    }
    if (data.length === 0) {
      response.status(404).json({ msg: "Usuario não encontrado" });
      return;
    }

    const usuario = data[0];
    response.status(200).json(usuario);
  });
};
export const editUser = async (request, response) => {
  const { id } = request.params;

  // Verificar se o usuario está logado
  try {
    const token = getToken(request);
    const user = await getUserByToken(token);

    const { nome, email, telefone } = request.body;

    // Adicionar imagem ao objeto
    let imagem = user.imagem;
    if (request.file) {
      imagem = request.file.filename;
    }

    if (!nome) {
      return response.status(400).json({ msgg: "O nome é obrigatorio" });
    }
    if (!email) {
      return response.status(400).json({ msgg: "O email é obrigatorio" });
    }
    if (!telefone) {
      return response.status(400).json({ msgg: "O telefone é obrigatorio" });
    }

    const checkSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`;
    const checkData = ["usuario_id", id];

    conn.query(checkSql, checkData, (err, data) => {
      if (err) {
        return response.status(400).json({ msgg: "Erro ao buscar usuario" });
      }
      if (data.length === 0) {
        return response.status(404).json({ msgg: "usuario não encontrado" });
      }

      const checkEmailSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ? AND ?? != ?`;
      const checkEmailData = ["email", email, "usuario_id", id];

      conn.query(checkEmailSql, checkEmailData, (err, data) => {
        if (err) {
          return response.status(400).json({ msgg: "Erro ao buscar usuario" });
        }
        if (data.lenght > 0) {
          return response.status(400).json({ msgg: "email já está em uso" });
        }

        const updateSql = /*sql*/ `UPDATE usuarios SET ? WHERE ?? = ?`;
        const updateData = [
          { nome, email, telefone, imagem },
          "usuario_id",
          id,
        ];
        conn.query(updateSql, updateData, (err) => {
          if (err) {
            return response
              .status(400)
              .json({ msgg: "Erro ao buscar usuario" });
          }
          response.status(200).json({ msg: "usuario atualizado com sucesso" });
        });
      });
    });
  } catch (error) {
    response.status(error.status || 500).json({
      msg: error.message || "Erro interno no servidor"
    });
  }
};
