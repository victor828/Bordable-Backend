import { NextFunction, Request, Response } from "express";
import z, { AnyZodObject, ZodError } from "zod";

export const schemaValidation =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
      return;
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          ok: false,
          message: error.errors,
        });
      }
      console.error("Error during schema validation:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

export const user = z.object({
  id: z
    .number({ description: "Necesita un numero" })
    .min(1, { message: "debe tener almenos un numero" })
    .int()
    .positive()
    .optional(),
  username: z
    .string({ description: "debe ser un string" })
    .min(3, { message: "debe contener almenos 3 caracteres" }),
  password: z
    .string()
    .min(6, { message: "debe contener almenos 6 caracteres" }),
  role: z.enum(["user", "admin"]).optional(),
  email: z
    .string()
    .email({ message: "debe ser un email valido" })
    .min(10)
    .optional(),
  firstname: z.string().min(3).optional(),
  lastname: z.string().min(3).optional(),
});

export const updateUsers = z.object({
  username: z
    .string({ description: "debe ser un string" })
    .min(3, { message: "debe contener almenos 3 caracteres" })
    .optional(),
  password: z
    .string()
    .min(6, { message: "debe contener almenos 6 caracteres" })
    .optional(),
  role: z.enum(["user", "admin"]).optional(),
  email: z
    .string()
    .email({ message: "debe ser un email valido" })
    .min(10)
    .optional(),
  firstname: z.string().min(3).optional(),
  lastname: z.string().min(3).optional(),
});

export const userLogin = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

//* ----------posts ------------------------

export const posts = z.object({
  content: z.string().min(3),
});
