import { controller_Cards } from "../Controllers/cards.controller";
import { authenticateHandler } from "../midelware/authentication.mdw";
import { authorize } from "../midelware/authorization.mdw";

const express = require("express");
export const cardRouter = express.Router();

//* create new board
cardRouter.post(
  "/board/:id_board/table/:id_table/new-card",
  // schemaValidation(Card)
  authenticateHandler,
  authorize("user", "admin"),
  controller_Cards.newCard
);

cardRouter.get(
  "/board/:id_board",
  authenticateHandler,
  authorize("user", "admin")
  // controller_Cards.getAllCards
);

cardRouter.patch(
  "/board/:id_board/table/:id_table/card/:id_card",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Cards.updateCard
);

//* delete board)

cardRouter.delete(
  "/board/:id_board/table/:id_table/card/:id_card",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Cards.delete
);

//* service
