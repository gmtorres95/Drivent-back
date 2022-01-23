import "@/setup";

import express from "express";
import "express-async-errors";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "@/database";
import errorHandlingMiddleware from "@/middlewares/errorHandlingMiddleware";
import router from "@/routers";
import * as controller from "@/controllers/client/ticket";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.send("OK!");
});
app.use(router);
app.use(errorHandlingMiddleware);
app.post("/ticket", controller.createTicket);

export async function init() {
  await connectDatabase();
}

export default app;
