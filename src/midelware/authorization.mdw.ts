import { NextFunction, Request, Response } from "express";
// import { userService } from "../Services/users.service";
import { ApiError } from "./error";
import { user } from "../Models/models";
// import { userService } from "../Services/users.service";

export function authorize(...allowedRoles: user["role"][]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const role = req.userRole;
    if (!role) return next(JSON.stringify(new ApiError("No autorizado", 401)));

    if (allowedRoles.includes(role as user["role"])) {
      next();
    } else {
      next(new ApiError("Acceso denegado", 403));
    }
  };
}
