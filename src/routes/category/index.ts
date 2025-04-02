import express from "express";
import getCategoriesRoute from "./get-categories";

const router = express.Router();

router.use("/categories", getCategoriesRoute);

export default router;
