import { Request, Response } from "express";
import { service_Tables } from "../Services/tables.service";

class Tables {
  // controller
  async newTable(req: Request, res: Response) {
    const idBoard = req.params["id_board"];
    const { body } = req;
    const result = await service_Tables.newTable(body, idBoard);
    return result
      ? res.status(200).json({ result })
      : res.status(400).json({ result });
  }

  async getAllTables(req: Request, res: Response) {
    const { id_board } = req.params;
    const result = await service_Tables.getAllTables(id_board);
    return result
      ? res.status(200).json({ result })
      : res.status(400).json({ result });
  }

  async update(req: Request, res: Response) {
    const { id_board, id_table } = req.params;
    const { userId, body } = req;
    const result = await service_Tables.update(
      body,
      id_board,
      userId,
      id_table
    );
    return result.ok
      ? res.status(200).json(result)
      : res.status(400).json(result);
  }

  async delete(req: Request, res: Response) {
    const { id_board, id_table } = req.params;
    const result = await service_Tables.delete(id_board, id_table);
    return result ? res.status(200).json(result) : res.status(400).json(result);
  }
}

export const controller_Tables = new Tables();
