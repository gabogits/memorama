import { Router } from "express";
import { rankingValidation, validate } from "../validation";
import { newRanking, getRanking } from "../controllers/rankingController";

const router = Router();

router.post("/", rankingValidation(), validate, newRanking);
router.get("/", getRanking);

export default router;
