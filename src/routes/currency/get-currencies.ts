import express from "express";
import getCurrenciesHandler from "../../handlers/currency/get-currencies";

const router = express.Router();

router.get("/", getCurrenciesHandler);

export default router;
