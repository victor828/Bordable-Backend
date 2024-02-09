import { Request, Response } from "express";
import { service_boards } from "../Services/board.service";

class Boards {
  async newBoard(req: Request, res: Response) {
    const { body, userId } = req;
    const result = await service_boards.newBoard(body, userId);
    return result.ok
      ? res.status(200).json({ data: result.data })
      : res.status(400).json({ data: result.data });
  }

  async update(req: Request, res: Response) {
    const { body, userId } = req;
    const board_id = req.params["id"];
    const result = await service_boards.update(body, board_id, userId);
    return result.ok
      ? res.status(200).json({ data: result })
      : res.status(400).json({ data: result });
  }
  async getBoard(req: Request, res: Response) {
    const { userId } = req;
    const boardId = req.params["id"];
    const result = await service_boards.getBoard(userId, boardId);
    return result.ok
      ? res.status(200).json({ data: result.data })
      : res.status(400).json({ data: result.data });
  }

  async getAllBoard(req: Request, res: Response) {
    const { userId } = req;
    const result = await service_boards.getBoards(userId);
    return result.ok
      ? res.status(200).json({ data: result.data })
      : res.status(400).json({ data: result.data });
  }

  async delete(req: Request, res: Response) {
    const { userId } = req;
    const boardId = req.params["id"];
    const result = await service_boards.delete(boardId, userId);
    return result.ok
      ? res.status(200).json({ data: result })
      : res.status(400).json({ data: result });
  }
}

export const controller_Boards = new Boards();
