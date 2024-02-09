import { pool } from "../Db/db";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { boards, cards, tables, user } from "../Models/models";
import { debugJson, updateQuery } from "../Utils/utils";
import { errorMessage } from "../midelware/error";
// console.log(`(*/ω＼*)/==|==> ${JSON.stringify(data)}`);
// console.log(`(*/ω＼*)  🦖 ${JSON.stringify(userFromBb)}`);
// const jwtSecret = "5uper53cr3t";
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
    console.log(`----> consulta 😎😎😎🦖🦖🦖🦖${consult}`);

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

  // async updateUser(data: user, id: string) {
  //   const consult = `UPDATE users
  //                  SET email = $1,
  //                      name = $2,
  //                      updateat = NOW()
  //                  WHERE id = $3
  //                  RETURNING *`;
  //   const values = [
  //     data.email || null,
  //     data.name,
  //     id,
  //   ];
  //   try {
  //     const response = await pool.query(consult, values);
  //     return response.rows;
  //   } catch (error) {
  //     console.error(error);
  //     return {
  //       message: error,
  //     };
  //   }
  // }

  // async deleteUser (id: string) {
  //   const consult = `DELETE FROM users WHERE id = $1`;
  //   await pool.query(consult, [id]);
  // }

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
    //  const temporaryEncryptedPassword = encrypt(data.password);
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
      data.email, // podria encriptar tambien el correo por una mayor seguridad anti hackin
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
      // console.log(error);
      return {
        ok: false,
        message: " (❁´◡`❁)  |┬┴┬┴┤(･_├┬┴┬┴| the user don't exist ", // + error,
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
      console.log(`(*/ω＼*)/==|==> ┗|｀O′|┛ ${JSON.stringify(result.rows[0])}`);

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
      console.log(`(*/ω＼*)/==|==> 🦖🦖 ${JSON.stringify(result.rows)}`);

      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false, //! posible elminacion
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  // console.log(`(*/ω＼*)/==|==> ${JSON.stringify(result.rows)}`);
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
    console.log(`(*/ω＼*)/==|==> ${JSON.stringify(data)}`);

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
    const consult = `SELECT t.*, c.* 
    FROM tables t 
    LEFT JOIN cards c 
    ON t.id = c.tableid 
    WHERE t.boardid = $1`;
    const values = [id_board];
    const result = await pool.query(consult, values);
    return result.rows;
  }

  async getTables(id_board: string, id_table: string) {
    const consult = `select t.*, c.* from tables as t left join cards as c on t.id = c.tableid where t.boardid = $1 and t.id = $2`;
    const values = [id_board, id_table];
    const result = await pool.query(consult, values);
    return result.rows[0];
  }

  async updateTable(data: tables, table_id: string, board_id: string) {
    const query = `UPDATE tables SET title = $1, updatedate = NOW() where id = $2 returning *`;
    const values = [data.title, table_id];
    try {
      const result = await pool.query(query, values);
      {
        ` update ${debugJson(result.rows)}`;
      }
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
      debugJson(result.rows);
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async getCards() {
    const query = `SELECT * FROM cards`;
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: `${errorMessage}  Error: ` + error,
      };
    }
  }

  async getCard(card_id: string, table_id: string) {
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
}

export const consult_Cards = new Cards();

export async function getFullBoard(board_id: string) {
  const consult = `SELECT t.*, c.* 
  FROM boards b
  LEFT JOIN tables t 
  ON b.id = t.boardid 
  LEFT JOIN cards c
  ON t.id = c.tableid
  WHERE b.id = $1`;
  const result = await pool.query(consult, [board_id]);
  return result.rows;
}
