import express, { Request, Response } from "express";
import { rateLimiter } from "./utils/limiter";
import cors from "cors";
import morgan from "morgan";

import errorMiddleware from "./middlewares/error";
import routes from "./routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(rateLimiter);

app.get("/health", (req: Request, res: Response) => {
  res.send("I am healthy");
});

app.use("/v1", routes);

app.use(errorMiddleware);
