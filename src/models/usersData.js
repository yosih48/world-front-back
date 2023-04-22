import db from "../../config/db.js";
import joi from "joi";
import jsonwebtoken from 'jsonwebtoken'
import * as dotenv from 'dotenv'
let jwt = jsonwebtoken 
dotenv.config();

class Data {
  constructor(userName, email, password) {
    this.userName = userName;
    this.email = email;
    this.password = password;
  }

  static async findAll() {
    let sql = "select * from users";
    return await db.execute(sql);
  }

  static async findById(id) {
    let sql = `select * from users where id = ?;`;
    return await db.execute(sql, [id]);
  }

  static async save(data) {
    let sql = `INSERT INTO users SET ?;`; //1
    try {
      console.log(data)
      const newUser = await db.query(sql, [data]); //1
      return newUser[0]; //1
    } catch (e) {
      console.error(e.stack);
      return 2;
    }
  }
  
  static async findByEmail(email) {
    let sql = `SELECT id, email,userName,IF(isAdmin, 'true', 'false')  isAdmin, password FROM users WHERE email = ?;`;
    console.log(email);
    return await db.execute(sql, [email]);
  }
 
  
  static async update(data) {
    let sql = `UPDATE users SET ? WHERE id = ?`;
    const newUser = await db.query(sql, [data, data.id]);
    return await newUser[0];
  }
  
  static async delete(id) {
    let sql = `DELETE FROM users WHERE id = ?`;
    return await db.execute(sql, [id]);
  }
  
  // ולידיזציה של הנתונים
  static validUser(body) {
    let userSchema = joi.object({
      id: joi.number(),
      userid: joi.number(),
      userName: joi.string().min(2).max(20),
      email: joi.string().email(),
      password: joi.string().min(4).max(20),
      points: joi.number(),
      // userName: joi.string().min(2).max(70)
      // email: joi.string().required().email(),
      // password: joi.string().required().min(2).max(100)
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



static createToken(userId, email){
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
  return token
}

}
export default Data;
