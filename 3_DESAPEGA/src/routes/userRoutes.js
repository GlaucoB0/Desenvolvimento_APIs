import { Router } from "express";
import { checkUser, login, register, getUserById, editUser } from "../controllers/usersControllers.js";
import validar_user from "../helpers/validar-user.js"
import verifyToken from "../helpers/verify-token.js"

const router = Router();

//localhost:3333/usuarios/
router.post("/", validar_user,  register);
router.post("/login", login);
router.get("/", checkUser);
router.get("/:id", getUserById);

// Verificar se está logado e 
router.put("/:id", verifyToken, editUser);


export default router;
