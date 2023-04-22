import db from "../../config/db.js";
import joi from "joi";
import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
let jwt = jsonwebtoken;
dotenv.config();

class Data {
  constructor(userID, gameID, home_team_goals, away_team_goals) {
    this.userID = userID;
    this.gameID = gameID;
    this.home_team_goals = home_team_goals;
    this.away_team_goals = away_team_goals;
  }

  static async findAll() {
    // let sql = "select * from guess";
    let sql = `select users.id, users.userName, users.points,guess.id, guess.userID, guess.gameID, guess.home_team_goals, guess.away_team_goals, guess.sum_points from guess JOIN users on users.id = guess.userID;`
    return await db.execute(sql);
  }

  static async findById(id) {
    let sql = `select * from guess where userid = ?;`;
    return await db.execute(sql, [id]);
  }
  // static async findByGameId(id) {
  //   let sql = `select * from guess where gameID = ?;`;
  //   return await db.execute(sql, [id]);
  // }

  static async save(data) {
    let sql = `INSERT INTO guess SET ?;`; //1
    try {
      console.log(data);
      const newUser = await db.query(sql, [data]); //1
      return newUser[0]; //1
    } catch (e) {
      console.error(e.stack);
      return 2;
    }
  }

  static async findByEmail(email) {
    let sql = `SELECT id, email, password FROM guess WHERE email = ?;`;
    console.log(email);
    return await db.execute(sql, [email]);
  }
  static async findByGameID(userID) {
    // let sql = `SELECT gameID, home_team_goals	, away_team_goals FROM guess WHERE userID = ?;`;
        let sql = `select users.id, users.userName, users.points, guess.userID, guess.gameID, guess.home_team_goals, guess.away_team_goals, guess.sum_points from guess JOIN users on users.id = guess.userID where gameID = ?`;
    console.log(userID);
    return await db.execute(sql, [userID]);
  }



  static async update(data) {
    // let sql = `UPDATE guess SET ? WHERE gameID = ?`;
    let sql = `UPDATE guess SET ? WHERE gameID = ? AND userID  = ?`;
    const newUser = await db.query(sql, [data, data.gameID, data.userID]);
    return await newUser[0];
  }

  static async delete(id) {
    let sql = `DELETE FROM guess WHERE id = ?`;
    return await db.execute(sql, [id]);
  }

  // ולידיזציה של הנתונים
  static validUser(body) {
    let userSchema = joi.object({
    id: joi.number(),
      userID: joi.number().required(),
      gameID: joi.number().required(),
      home_team_goals: joi.number().required(),
      away_team_goals: joi.number().required(),
    });
    return userSchema.validate(body);
  }
  static validUpdate(body) {
    let userSchema = joi.object({
      // id: joi.number().required(),
      userID: joi.number().required(),
      gameID: joi.number().required(),
      home_team_goals: joi.number().allow(null).allow(""),
      away_team_goals: joi.number().allow(null).allow(""),
      sum_points: joi.number().allow(null).allow(""),
    });
    return userSchema.validate(body);
  }




  static validLogin(body) {
    let userSchema = joi.object({
      email: joi.string().required().email(),
      password: joi.string().required().min(4).max(100),
    });
    return userSchema.validate(body);
  }
  // static validput(body) {
  //   let userSchema = joi.object({
  //     id: joi.number().required,

  //   });
  //   return userSchema.validate(body);
  // }

  static createToken(userId, email) {
    const token = jwt.sign(
      {
        id: userId,
        email: email,
      },
      process.env.jwt_key,
      {
        expiresIn: "1H",
      }
    );
    return token;
  }
}
export default Data;
