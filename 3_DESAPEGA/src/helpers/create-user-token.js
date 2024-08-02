import jwt from "jsonwebtoken"

const createUserToken = async (user, request, response) => {
    // Criar o token
    const token = jwt.sign(
        {
            nome: user.nome,
            id: user.usuario_id
        },
        "SENHASUPERSEGURAEDIFICIL" // Senha para a criptografia
    )
    // Retornar o token
        response.status(200).json({
            msg: "Você está logado!",
            token: token,
            usuarioId: user.usuario_id
        })
}
export default createUserToken