// import { schemaValidation } from "../Schema/schemas";
import { controller_Tables } from "../Controllers/tables.controller";
import { authenticateHandler } from "../midelware/authentication.mdw";
import { authorize } from "../midelware/authorization.mdw";

const express = require("express");
export const tablesRouter = express.Router();

//* create new board
tablesRouter.post(
  "/board/:id_board/new-table",
  // schemaValidation(tables)
  authenticateHandler,
  authorize("user", "admin"),
  controller_Tables.newTable
);

tablesRouter.get(
  "/allboard/:id_board",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Tables.getAllTables
);

tablesRouter.patch(
  "/board/:id_board/table/:id_table",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Tables.update
);

tablesRouter.delete(
  "/board/:id_board/table/:id_table",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Tables.delete
);
