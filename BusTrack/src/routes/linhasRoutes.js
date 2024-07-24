import { Router } from "express";

import {
  getLinhas,
  postLinha,
  buscarLinha,
  editarLinha,
} from "../controllers/linhasController.js";

const router = Router();

router.get("/", getLinhas);
router.post("/", postLinha);
router.get("/:id", buscarLinha);
router.put("/:id", editarLinha);

export default router;
