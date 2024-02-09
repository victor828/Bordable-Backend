import { Request, Response } from "express";
import { service_Cards } from "../Services/cards.service";

class Cards {
  // controller
  async newCard(req: Request, res: Response) {
    const { id_table } = req.params;
    const { body } = req;
    const result = await service_Cards.newCard(body, id_table);
    return result.ok
      ? res.status(201).json(result)
      : res.status(400).json(result);
  }

  async updateCard(req: Request, res: Response) {
    const { id_board, id_table, id_card } = req.params;
    const { body } = req;
    const result = await service_Cards.updateCard(
      id_board,
      id_table,
      id_card,
      body
    );
    return result.ok
      ? res.status(200).json(result)
      : res.status(400).json(result);
  }

  async delete(req: Request, res: Response) {
    try {
      const { id_board, id_table, id_card } = req.params;
      const result = await service_Cards.delete(id_board, id_table, id_card);
      return result
        ? res.status(200).json(result)
        : res.status(400).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred" });
    }
    //* <ctrl63> e:\Programacion\bordableBackend\src\Routes\boards.routes.ts
  }
}

export const controller_Cards = new Cards();
