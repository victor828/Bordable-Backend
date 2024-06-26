import { Request, Response } from "express";
import { service_User } from "../Services/users.service";

class Users {
  async newUser(req: Request, res: Response) {
    const data = req.body;
    const result = await service_User.newUser(data);
    return result.ok
      ? res.status(200).json(result)
      : res.status(400).json(result);
  }

  async update_User(req: Request, res: Response) {
    const { body, userId: user_id } = req;
    const result = await service_User.update_User(body, user_id);
    return result.ok
      ? res.status(200).json(result)
      : res.status(400).json(result);
  }

  async getUser(req: Request, res: Response) {
    const user_id = req.userId;
    const result = await service_User.getUser(user_id);
    return result.ok
      ? res.status(200).json(result)
      : res.status(400).json(result);
  }

  async login(req: Request, res: Response) {
    const data = req.body;
    const result = await service_User.login(data);
    return result.ok
      ? res.status(200).json(result)
      : res.status(400).json(result);
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req;
    const result = await service_User.delete(userId);
    return result.ok
      ? res.status(200).json({ data: result })
      : res.status(400).json({ data: result });
  }
}

export const controller_Users = new Users();
