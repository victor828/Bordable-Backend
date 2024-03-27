import { consult_Cards } from "../Consult/consults";

class cards {
  async newCard(data: any, id_table: string) {
    // todo: tanto el board debe pertencerle al usuario, si le pertenece entontonces la tabla con el id de la board le pertenece
    const result = await consult_Cards.newCard(data, id_table);
    return result ? { ok: true, data: result } : { ok: false, data: result };
  }

  async getAllCards(user_id: string) {
    const result = await consult_Cards.getCardsTable(user_id);
    return result ? { ok: true, data: result } : { ok: false, data: result };
  }

  async updateCard(
    id_board: string,
    id_table: string,
    id_card: string,
    body: any
  ) {
    //   id_board, exist?
    //   id_table, exist?
    const result = await consult_Cards.update(body, id_card);
    return result ? { ok: true, data: result } : { ok: false, data: result };
  }

  async delete(id_board: string, id_table: string, id_carad: string) {
    const exist = await consult_Cards.getCard(id_carad, id_table);
    if (!exist) return { ok: false, message: "the card does not exist" };
    try {
      await consult_Cards.delete(id_carad);
      const result = await consult_Cards.getCard(id_carad, id_table);
      return !result
        ? { ok: true, message: "has deleted" }
        : { ok: false, message: "has not deleted" };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "An error occurred while deleting the card",
      };
    }
  }

  async dragAndDrop(id_card: string, id_table: string) {
    const result = await consult_Cards.dragAndDrop(id_card, id_table);
    
    if (!result) return { ok: false, message: "the drop was not successful" };
    return result ? { ok: true, data: result } : { ok: false, data: result };
    
  }
}
export const service_Cards = new cards();
