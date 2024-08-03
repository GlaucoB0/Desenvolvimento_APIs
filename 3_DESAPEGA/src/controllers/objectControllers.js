import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import { v4 as uuidv4 } from "uuid";
import conn from "../config/conn.js";

export const create = async (request, response) => {
  const { nome, peso, cor, descricao } = request.body;
  const disponivel = 1;

  // Buscar o token do usuario cadastrado
  const token = getToken(request);
  const user = await getUserByToken(token);

  if (!nome) {
    return response.status(400).json({ msg: "O nome do objeto é obrigatório" });
  }
  if (!peso) {
    return response.status(400).json({ msg: "O peso do objeto é obrigatório" });
  }
  if (!cor) {
    return response.status(400).json({ msg: "O cor do objeto é obrigatório" });
  }
  if (!descricao) {
    return response
      .status(400)
      .json({ msg: "O descricao do objeto é obrigatório" });
  }

  const objeto_id = uuidv4();
  const usuario_id = user.usuario_id;
  const insertSql = /*sql*/ `
        INSERT INTO objects (??, ??, ??, ??, ??, ??, ??)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  const insertData = [
    "objeto_id",
    "nome",
    "peso",
    "cor",
    "descricao",
    "usuario_id",
    "disponivel",
    objeto_id,
    nome,
    peso,
    cor,
    descricao,
    usuario_id,
    disponivel,
  ];

  conn.query(insertSql, insertData, (err, data)=>{
    if(err){
        console.error(err)
        return response.status(500).json({err: "Erro ao cadastrar objeto"})
    }

    if(request.files){
        // Cadastrar no banco
        const insertImagesSql = /*sql*/`
            INSERT INTO object_images (image_id, objeto_id, image_path)
            VALUES ?
        `
        const imageValues = request.files.map((file)=>[
            uuidv4(),
            objeto_id,
            file.filename
        ])
        conn.query(insertImagesSql, [imageValues], (err)=>{
            if(err){
                console.error(err)
                return response.status(500).json({err: "Erro ao cadastrar objeto"})
            }
            response.status(201).json({msg: "objeto criado"})
        })
    } else {
        response.status(201).json({msg: "objeto criado"})
    }
  })
};
