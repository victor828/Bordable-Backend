import { controller_Boards } from "../Controllers/board.controller";
import { authenticateHandler } from "../midelware/authentication.mdw";
import { authorize } from "../midelware/authorization.mdw";

const express = require("express");
export const boardsRouter = express.Router();

//* create new board
boardsRouter.post(
  "/new-board",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Boards.newBoard
);

boardsRouter.get(
  "/get-board/:id",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Boards.getBoard
);

boardsRouter.get(
  "/board/:sort",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Boards.getAllBoard
);

boardsRouter.patch(
  "/update-board/:id",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Boards.update
);

boardsRouter.delete(
  "/delete-board/:id",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Boards.delete
);

