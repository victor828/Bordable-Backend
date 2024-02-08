import { pool } from "../Db/db";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { user } from "../Models/users.models";
import { updateQuery } from "../Utils/utils";
// console.log(`(*/ω＼*)/==|==> ${JSON.stringify(data)}`);
// console.log(`(*/ω＼*)  🦖 ${JSON.stringify(userFromBb)}`);
// const jwtSecret = "5uper53cr3t";
const jwtSecret = process.env["JWTSECRET"];

//! admin
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
    console.log(`(*/ω＼*)/==|==> ${user_id}`);

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

    const consult3 = `,updatedat = NOW() 
                   WHERE id = $1 
                   RETURNING *`;
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
  //                  SET username = $1,
  //                      email = $2,
  //                      firstname = $3,
  //                      lastname = $4,
  //                      updateat = NOW()
  //                  WHERE id = $5
  //                  RETURNING *`;
  //   const values = [
  //     data.username,
  //     data.email,
  //     data.firstname,
  //     data.lastname,
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
    const consult = `INSERT INTO users(
      username,
      password,
      role,
      email,
      name      )
    VALUES($1,$2,$3,$4,$5) RETURNING *`;
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
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "20m" });

      if (checkPassword) {
        const data = {
          user: userFromBb,
          token: token,
        };
        return data;
      } else {
        return {
          ok: false,
          message: " (●'◡'●)  |┬┴┬┴┤(･_├┬┴┬┴| ",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: " (❁´◡`❁)  |┬┴┬┴┤(･_├┬┴┬┴| " + error,
      };
    }
  }
}

export const consults_Users = new UsersConsults();
