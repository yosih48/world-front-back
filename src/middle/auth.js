import jsonwebtoken from 'jsonwebtoken'
const jwt = jsonwebtoken;
// #!/usr/bin/env node
import * as fs from "fs";


import dotenv from "dotenv";
dotenv.config();

// import nodemailer from "nodemailer";

 const auth  = async(req, res, next) => {
  const tokenAuth = req.headers.authorization?.split(" ")[1];
  if (!tokenAuth) {
    return res.status(401).json({ msg: `you need token` });
  }

  try {
    let validToken = await jwt.verify(tokenAuth, process.env.JWT_KEY);
    req.theToken = validToken;
    // אם תקין עובר לפונקציה הבאה
    next();

  } catch (error) {
    return res.status(401).json({ msg: `token is invalid or expierd` });
  }
};
 export default auth;