import { Router } from "express";
import { create } from "../controllers/objectControllers.js";
import verifyToken from "../helpers/verify-token.js";


const router = Router();

//localhost:3333/objetos/
router.post("/", verifyToken, create);

export default router;
