import { Router } from "express";
import { create, getAllObjectUser } from "../controllers/objectControllers.js";
import imageUpload from "../helpers/image-upload.js";
import verifyToken from "../helpers/verify-token.js";


const router = Router();

//localhost:3333/objetos/
router.post("/", verifyToken, imageUpload.array("imagens", 10), create);
router.get("/users/images", verifyToken, getAllObjectUser );

export default router;
