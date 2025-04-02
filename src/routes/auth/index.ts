import express from "express";
import loginRoutes from "./login";

const router = express.Router();

router.use("/auth", loginRoutes);

export default router;
