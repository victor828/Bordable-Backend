import { consults_Users } from "../Consult/consults";
import { user } from "../Models/models";

class Users {
  async newUser(data: user) {
    // Updated type declaration
    const result = await consults_Users.newUser(data);
    return result ? { ok: true, data: result } : { ok: false, data: result };
  }

  async getUser(user_id: string) {
    const result = await consults_Users.getUser(user_id);
    return result ? { ok: true, data: result } : { ok: false, data: result };
  }

  async login(data: user) {
    const result = await consults_Users.login(data);
    return result ? { ok: true, data: result } : { ok: false, data: result };
  }

  async delete(userId: string) {
    await consults_Users.deleteUser(userId);
    return { ok: true, mesage: `User has Deleted` };
  }
}
export const service_User = new Users();
