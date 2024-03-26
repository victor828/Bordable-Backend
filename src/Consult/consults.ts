import { pool } from "../Db/db";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { boards, cards, tables, user } from "../Models/models";
import { updateQuery } from "../Utils/utils";
import { errorMessage } from "../midelware/error";
const jwtSecret = process.env["JWTSECRET"];

class UsersConsults {
  async allUsers() {
    const consult = `SELECT * FROM users order by id`;
    try {
      const result = await pool.query(consult);
      return result.rows;
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Error: " + error,
      };
    }
  }

  //* user, admin
  async getUser(user_id: string) {
    const consult = `SELECT * FROM users WHERE id = $1`;
    try {
      const result = await pool.query(consult, [user_id]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Error: " + error,
      };
    }
  }

  //* user, admin
  async updateUser(data: user, id: string) {
    const consult1 = `UPDATE users SET `;
    const consult2 = updateQuery(data);

    const consult3 = `,updatedate = NOW() 
                   WHERE id = $1 
                   RETURNING name, email`;
    const consult = consult1 + consult2 + consult3;
    try {
      const response = await pool.query(consult, [id]);
      return response.rows;
    } catch (error) {
      console.error(error);
      return {
        message: error,
      };
    }
  }

  async getUserByName(user: string) {
    const consult = `SELECT * FROM users WHERE username = $1`;
    try {
      const result = await pool.query(consult, [user]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: "Error: " + error,
      };
    }
  }

  async newUser(data: user) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const consult = `INSERT INTO users(
      username,
      password,
      role,
      email,
      name,
      createdate,
      updatedate
      )
    VALUES($1,$2,$3,$4,$5,NOW(), NOW()) RETURNING username, name, email`;
    const values = [
      data.username,
      hashedPassword,
      data.role || "user",
      data.email,
      data.name,
    ];
    try {
      const res = await pool.query(consult, values);
      return res.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: " (❁´◡`❁)  |┬┴┬┴┤(･_├┬┴┬┴| " + error,
      };
    }
  }

  async deleteUser(id: string) {
    const consult = `DELETE FROM users WHERE id = $1`;
    try {
      const res = await pool.query(consult, [id]);
      return res.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: " (❁´◡`❁)  |┬┴┬┴┤(･_├┬┴┬┴| " + error,
      };
    }
  }

  async login(data: user) {
    try {
      const userFromBb = await this.getUserByName(data.username);
      const checkPassword = await bcrypt.compare(
        data.password,
        userFromBb.password
      );

      const payload = {
        userId: userFromBb.id,
        userRole: userFromBb.role,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "12h" });

      if (checkPassword) {
        const data = {
          user: userFromBb,
          token: token,
        };
        return data;
      } else {
        return {
          ok: false,
          message:
            " (●'◡'●)  |┬┴┬┴┤(･_├┬┴┬┴| the password or user is not correct ",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message:
          " (❁´◡`❁)  |┬┴┬┴┤(･_├┬┴┬┴| the user or password is not correct ", // + error,
      };
    }
  }
}

export const consults_Users = new UsersConsults();

class Boards {
  async newBoard(data: boards, userid: string) {
    const consult = `
  INSERT INTO boards (userid, title, color, createdate, updatedate)
  VALUES ($1, $2, $3, NOW(), NOW())
  RETURNING *
`;
    const values = [userid, data.title, data.color || "#E2E8F0"];
    try {
      const result = await pool.query(consult, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false, //! posible elminacion
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async update(data: boards, board_id: string) {
    const consult = `UPDATE boards SET title = $1, color = $2, updatedate = NOW() where id = $3 returning *`;
    const values = [data.title || null, data.color || "#E2E8F0", board_id];
    try {
      const result = await pool.query(consult, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false, //! posible elminacion
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async getBoard(user_id: string, boardId: string) {
    const consult = `SELECT * FROM boards WHERE userid = $1 AND id = $2 `;
    const values = [user_id, boardId];
    try {
      const result = await pool.query(consult, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false, //! posible elminacion
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async getAllBoard(user_id: string) {
    const consult = `SELECT * FROM boards WHERE userid = $1`;
    try {
      const result = await pool.query(consult, [user_id]);
      return result.rows;
    } catch (error) {
      console.log(error);
      return {
        ok: false, //! posible elminacion
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async delete(board_id: string, user_id: string) {
    const consult = `DELETE FROM boards WHERE id = $1 AND userid = $2`;
    try {
      await pool.query(consult, [board_id, user_id]);
      return { ok: true };
    } catch (error) {
      console.log(error);
      return {
        ok: false, //! posible elminacion
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }
}

export const consults_Boards = new Boards();

class Tables {
  async newTable(data: tables, board_id: string) {
    const query = `INSERT INTO tables(boardid, title, createdate, updatedate)
     values($1,$2, NOW(), NOW()) returning *`;
    const values = [board_id, data.title];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async getAllTables(id_board: string) {
    const consult = `select t.*, count(c.*) cardsCount
from tables t
left join cards c
on t.id = c.tableid
where t.boardid = $1
group by t.id
`;
    const values = [id_board];
    const result = await pool.query(consult, values);
    return result.rows;
  }

  async getTables(id_board: string, id_table: string) {
    const consult = `SELECT *  from tables where boardid = $1 and id = $2`;
    const values = [id_board, id_table];
    const result = await pool.query(consult, values);
    return result.rows[0];
  }

  async updateTable(data: tables, table_id: string, board_id: string) {
    const query = `UPDATE tables SET title = $1, updatedate = NOW() where id = $2 AND boardid = $3 returning *`;
    const values = [data.title, table_id, board_id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async deleteTable(table_id: string) {
    const query = `DELETE FROM tables WHERE id = $1`;
    const values = [table_id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }
}

export const consult_Tables = new Tables();

class Cards {
  async newCard(data: cards, table_id: string) {
    const query = `INSERT INTO cards(tableid, title, createdate, updatedate)
     values($1,$2, NOW(), NOW()) returning *`;
    const values = [table_id, data.title];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async getCard(id_carad: string, id_table: string) {
    const query = `SELECT * FROM cards where id = $1 AND tableid = $2`;
    try {
      const result = await pool.query(query, [id_carad, id_table]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async getAllCard(id_carad: string, id_table: string) {
    const query = `SELECT * FROM cards tableid = $2`;
    try {
      const result = await pool.query(query, [id_carad, id_table]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async getCardsTable(user_id: string) {
    const query = `SELECT b.userid, c.*  
      FROM tables as t 
      left join boards as b
      on t.boardid = b.id
      right join cards as c
      on t.id = c.tableid
      WHERE b.userid = $1`;
    try {
      const result = await pool.query(query, [user_id]);
      return result.rows;
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async getAllCards(card_id: string, table_id: string) {
    const query = `SELECT * FROM cards where id = $1 AND tableid = $2`;
    try {
      const result = await pool.query(query, [card_id, table_id]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async update(data: cards, card_id: string) {
    const query = `UPDATE cards SET title = $1, updatedate = NOW() 
    where id = $2 returning *`;
    const values = [data.title, card_id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async delete(card_id: string) {
    const query = `DELETE FROM cards WHERE id = $1`;
    const values = [card_id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async dragAndDrop(
    card_id: string,
    table_id: string,
  ) {
    const query = `UPDATE cards SET tableid = $1 where id = $2 `
    const result = await pool.query(query, [table_id, card_id]);
    return result.rows[0];
  }
}
  export const consult_Cards = new Cards();
  

export async function getFullBoard(board_id: string) {
  const consult = `select b.id as boardId, t.*, c.*  from 
  tables t
  inner join boards b
  on t.boardid = b.id
  LEFT JOIN cards c
    on t.id = c.tableid
  where t.boardid = $1`;
  const result = await pool.query(consult, [board_id]);
  return result.rows;
}
