import express from "express";
import getCategoriesHandler from "../../handlers/category/get-categories";

const router = express.Router();

router.get("/", getCategoriesHandler);

export default router;
