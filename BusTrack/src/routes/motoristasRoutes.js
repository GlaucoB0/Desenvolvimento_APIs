import { Router } from "express";

import {
  getMotoristas,
  postMotorista,
  buscarMotorista,
  deletarMotorista,
} from "../controllers/motoristaController.js";

const router = Router();

router.get("/", getMotoristas);
router.post("/", postMotorista);
router.get("/:id", buscarMotorista);
router.delete("/:id", deletarMotorista);

export default router;
