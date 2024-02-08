import express from "express";
import { usersRouter } from "./Routes/users.routes";
import { boardsRouter } from "./Routes/boards.routes";
require("dotenv").config();

const app = express();
const PORT = process.env["PORT"] || 0;

app.use(express.json());
app.use("", usersRouter);
app.use("", boardsRouter);

const server = app.listen(PORT, () => {
  const { port } = server.address() as any;
  console.log(`Escuchando al puerto ${port}`);
});
