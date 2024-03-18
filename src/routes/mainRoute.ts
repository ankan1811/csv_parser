import express from "express";
import { getStatus } from "../controller/mainController";

const router = express.Router();
router.get("/get_card_status", getStatus);

export default router;
