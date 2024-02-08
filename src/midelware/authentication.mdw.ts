import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
import { ApiError } from "./error";

const JWT_SECRET = "5uper53cr3t";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      userName: string;
      userRole?: string;
    }
  }
}

export function authenticateHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ApiError("No autorizado", 401));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      userRole: string;
      iat: number;
      exp: number;
    };

    console.log("desde el midelware --> ", payload);

    req.userId = payload.userId;
    req.userRole = payload.userRole;
    next();
  } catch (error) {
    return next(new ApiError("No autorizado", 401));
  }
}
