import { Router } from "express";

import {
  getAllOnibus,
  postOnibus,
  BuscarOnibus,
} from "../controllers/onibusController.js";

const router = Router();

router.get("/", getAllOnibus);
router.post("/", postOnibus);
router.get("/:id", BuscarOnibus);

export default router;
