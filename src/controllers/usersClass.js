import fetch from "node-fetch";
import bcrypt from "bcrypt";

import path from "path";
import { json } from "stream/consumers";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import * as fs from "fs";
// ייבוא של הקלאס
import Data from "../models/usersData.js";

export default class User {
  constructor() {}
  // static users(req, res) {
  //   fs.createReadStream(
  //     path.join(__dirname, "../../public/matches.html")
  //   ).pipe(res);
  // }


  async showUsers(req, res) {
    try {
      const [users, _] = await Data.findAll();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  }
  async showUserById(req, res) {
    try {
      let userId = req.params.id;
      let [user, _] = await Data.findById(userId);
      res.json( user);
    } catch (error) {
      console.log(error);
    }
  }

  async addUser(req, res) {
    try {
      let validData = Data.validUser(req.body);
      if (validData.error) {
         console.log(validData.error.details);
        return res.status(400).json(validData.error.details);
      }
      //   בדיקה אם האימייל קיים במערכת
      let useremail = await Data.findByEmail(req.body.email);
      console.log(useremail[0][0]);
      if (useremail[0][0]?.email.length > 0) {
        return res.status(401).json({ msg: `email is already exist` });
      }
      // הצפנה של הסיסמה
      // let mypassword = await bcrypt.hash(req.body.password,10)
      req.body.password = await bcrypt.hash(req.body.password, 10);

      let user = await Data.save(req.body);
      if (user.insertId || user !== 2) {
        console.log(user, user.insertId);

        res.json({error: false, msg: `Hello POST register this id is: ${user.insertId}` });
      } else {
        res.status(400).json({ error: true, msg: `error: entering the data` });
      }
    } catch (error) {
   
      console.log(error);
    }
  }

  async login(req, res) {
    let validData = Data.validLogin(req.body);
    if (validData.error) {
      return res.status(400).json(validData.error.details);
    }
    // בדיקה אם האימייל קיים
    let user = await Data.findByEmail(req.body.email);
    if (!user[0][0]?.email.length > 0) {
      return res.status(401).json({ msg: `auth faild` });
  
    }

    // התאמת סיסמה
    let comparePass = await bcrypt.compare(req.body.password, user[0][0]?.password);
    console.log(user[0][0]?.password, req.body.password)
    if(!comparePass){
      return res.status(401).json({msg: 'auth faild'})
    }

    // יצירת טוקן
    let newToken = Data.createToken(user[0][0]?.id ,user[0][0]?.email);
    res.json({
      error: false,
      msg: `auth successful`,
      id: user[0][0].id,
      name: user[0][0].userName,
      admin: user[0][0].isAdmin
      // newToken: newToken,
    });
 console.log(newToken);

  }

  async deleteUser(req, res) {
    try {
      let userId = req.params.id;

      let [user, _] = await Data.delete(userId);

      res.json({ msg: `user ${userId} is deleted` });
    } catch (error) {
      console.log(error);
    }
  }
  async userinfo(req, res){
    res.json({msg: 'user info'})
  }

  async updateUser(req, res) {
    try {
      let validData = Data.validUser(req.body);
      if (validData.error) {
        console.log(validData.error.details);
        return res.status(400).json(validData.error.details);
      }
      //  // הצפנה של הסיסמה
      // req.body.password = await bcrypt.hash(req.body.password, 10);
      let user = await Data.update(req.body);
      console.log(user, user.insertId);
      res.json({ msg: `hello post this id is: ${user.insertId}` });
    } catch (error) {
      console.log(error);
    }
  }
}
