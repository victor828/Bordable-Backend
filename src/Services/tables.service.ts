import { consult_Tables, getFullBoard } from "../Consult/consults";
import { tables } from "../Models/models";
import { debugData, debugJson } from "../Utils/utils";
import { errorMessage } from "../midelware/error";

class Table {
  // services
  async newTable(body: tables, id_board: string) {
    const result = await consult_Tables.newTable(body, id_board);
    return result ? { ok: true, data: result } : { ok: false, data: result };
  }

  async getAllTables(id_board: string) {
    const result = await getFullBoard(id_board);
    return result ? { ok: true, data: result } : { ok: false, data: result };
  }

  async update(
    body: tables,
    id_board: string,
    userId: string,
    id_table: string
  ) {
    const exist = await consult_Tables.getTables(id_board, id_table);
    if (!exist) {
      return { ok: false, message: "Table not exist" };
    }
    debugData(errorMessage + "update");
    debugJson(exist);
    const result = await consult_Tables.updateTable(body, id_board, userId);
    return result ? { ok: true, data: result } : { ok: false, data: result };
  }

  async delete(id_board: string, id_table: string) {
    try {
      const exist = await consult_Tables.getTables(id_board, id_table);
      // debugJson(exist);
      if (!exist) {
        return { ok: false, message: "Table not exist" };
      } else {
        await consult_Tables.deleteTable(id_table);
        return { ok: true, message: "Table deleted" };
      }
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "An error occurred while deleting the table",
      };
    }
  }
}

export const service_Tables = new Table();
