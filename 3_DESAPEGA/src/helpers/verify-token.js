import jwt from "jsonwebtoken";
import getToken from "./get-token.js";

const verifyToken = (request, response, next) => {
    if(!request.headers.authorization){
        return response.status(401).json({err: "Acesso negado"})
    }
    const token = getToken(request)
    if(!token){
        return response.status(401).json({err: "Acesso negado"})
    }
    try {
        const verified = jwt.verify(token, "SENHASUPERSEGURAEDIFICIL")
        request.usuario = verified
        next()
    } catch (error){
        response.status(400).json({err: "Token inválido"})
    }
};

export default verifyToken;
