import { Router } from "express";

import {
  getAllOnibus,
  postOnibus,
  buscarOnibus,
} from "../controllers/onibusController.js";

const router = Router();

router.get("/", getAllOnibus);
router.post("/", postOnibus);
router.get("/:id", buscarOnibus);

export default router;
