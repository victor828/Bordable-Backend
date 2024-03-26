import express from "express";
import { usersRouter } from "./Routes/users.routes";
import { boardsRouter } from "./Routes/boards.routes";
import { tablesRouter } from "./Routes/tables.routes";
import { cardRouter } from "./Routes/cards.routes";
import cors from "cors";
require("dotenv").config();

const app = express();
const PORT = process.env["PORT"] || 0;

app.use(express.json());
app.use(cors());

app.use("", usersRouter);
app.use("", boardsRouter);
app.use("", tablesRouter);
app.use("", cardRouter);

const server = app.listen(PORT, () => {
  const { port } = server.address() as any;
  console.log(`Escuchando al puerto ${port}`);
});
