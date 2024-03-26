import { Request, Response } from "express";
import { service_Cards } from "../Services/cards.service";

class Cards {
  // controller
  async newCard(req: Request, res: Response) {
    const { id_table } = req.params;
    const { body } = req;
    const result = await service_Cards.newCard(body, id_table);
    return result.ok
      ? res.status(201).json(result.data)
      : res.status(400).json(result.data);
  }

  async getAllCards(req: Request, res: Response) {
    // const { id_table } = req.params;
    const { userId } = req;
    const result = await service_Cards.getAllCards(userId);
    return result.ok
      ? res.status(200).json(result.data)
      : res.status(400).json(result.data);
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
      ? res.status(200).json(result.data)
      : res.status(400).json(result.data);
  }

  async delete(req: Request, res: Response) {
    try {
      const { id_board, id_table, id_card } = req.params;
      const result = await service_Cards.delete(id_board, id_table, id_card);
      return result
        ? res.status(200).json(result.message)
        : res.status(400).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  }

  async dragAndDrop(req: Request, res: Response) {
      const { id_card, idTable } = req.params;
      console.log(id_card, idTable); //49  22
      
      const result = await service_Cards.dragAndDrop(id_card, idTable)
      return result
        ? res.status(200).json(result.message)
        : res.status(400).json(result);
  }
  //   try {
  //     const { id_card, idTable } = req.params
  //     //* console.log(id_card, idTable); //49  22
      
  //     const result = await service_Cards.dragAndDrop(id_card, idTable)
  //     return result
  //       ? res.status(200).json(result.message)
  //       : res.status(400).json(result);
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ message: "An error occurred" });
  //   }
  // }
}

export const controller_Cards = new Cards();
