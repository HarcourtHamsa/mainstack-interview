import express from "express";
import getCurrenciesRoute from "./get-currencies";

const router = express.Router();

router.use("/currencies", getCurrenciesRoute);

export default router;
