import { Router } from "express";
import { speak } from "../controllers/speechController";

const router = Router();

router.post("/speak", speak);

export default router;