import { Router } from "express";
import { create } from "../controllers/objectControllers.js";
import imageUpload from "../helpers/image-upload.js";
import verifyToken from "../helpers/verify-token.js";


const router = Router();

//localhost:3333/objetos/
router.post("/", verifyToken, imageUpload.array("imagens", 10), create);

export default router;
