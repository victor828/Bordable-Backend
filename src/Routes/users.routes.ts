import { controller_Users } from "../Controllers/users.controller";
import { schemaValidation, user, userLogin } from "../Schema/schemas";
import { authenticateHandler } from "../midelware/authentication.mdw";
import { authorize } from "../midelware/authorization.mdw";

const express = require("express");
export const usersRouter = express.Router();

//* Informacion del usuario
usersRouter.get(
  "/account",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Users.getUser
);

usersRouter.delete(
  "/delete",
  authenticateHandler,
  authorize("user", "admin"),
  controller_Users.deleteUser
);

usersRouter.post("/login", schemaValidation(userLogin), controller_Users.login);
usersRouter.post("/signup", schemaValidation(user), controller_Users.newUser);

usersRouter.get(
  "/#"
  // controller_Users.
);
