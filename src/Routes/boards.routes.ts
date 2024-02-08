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
  "/get-board/",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Boards.getAllBoard
);

boardsRouter.delete(
  "/delete/:id",
  authenticateHandler,
  authorize("user", "admin")
  // controller_Boards.deleteUser
);
