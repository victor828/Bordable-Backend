import { consults_Boards } from "../Consult/consults";
import { boards } from "../Models/models";

class Boards {
  async newBoard(data: boards, userid: string) {
    // i don't need verify if exist because the name is not unique
    const result = await consults_Boards.newBoard(data, userid);
    return result ? { ok: true, data: result } : { ok: false, data: result };
  }

  async update(data: boards, boardid: string, user_id: string) {
    /* // todo: PRocesos
    necesito verificar si necesitare mover la url
    */
    try {
      const exist = await consults_Boards.getBoard(user_id, boardid);
      if (exist) {
        const result = await consults_Boards.update(data, boardid);
        return result
          ? { ok: true, data: result }
          : { ok: false, data: result };
      } else {
        return { ok: false, message: "Board not found" };
      }
    } catch (error) {
      console.error("Error deleting board:", error);
      throw new Error("Error deleting board");
    }
  }

  async getBoards(id_user: string) {
    const result = await consults_Boards.getAllBoard(id_user);
    return result ? { ok: true, data: result } : { ok: false, data: result };
  }

  async getBoard(id_user: string, boardId: string) {
    const result = await consults_Boards.getBoard(id_user, boardId);
    return result ? { ok: true, data: result } : { ok: false, data: result };
  }

  async delete(board_Id: string, id_user: string) {
    try {
      const exist = await consults_Boards.getBoard(id_user, board_Id);
      if (exist) {
        const result = await consults_Boards.delete(board_Id, id_user);
        return result
          ? { ok: true, message: "Delete complete" }
          : { ok: false, message: "Can't be deleted" };
      } else {
        return { ok: false, message: "Board not found" };
      }
    } catch (error) {
      console.error("Error deleting board:", error);
      throw new Error("Error deleting board");
    }
  }

  // // todo:
  // async getUser(user_id: string) {
  //   const result = await consults_Users.getUser(user_id);
  //   return result ? { ok: true, data: result } : { ok: false, data: result };
  // }

  // // todo:
  // async login(data: user) {
  //   const result = await consults_Users.login(data);
  //   return result ? { ok: true, data: result } : { ok: false, data: result };
  // }

  // // todo:
  // async delete(userId: string) {
  //   await consults_Users.deleteUser(userId);
  //   return { ok: true, mesage: `User has Deleted` };
  // }
}
export const service_boards = new Boards();
