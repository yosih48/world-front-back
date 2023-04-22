// קריאה לפורט מקובץ .ENV
import * as dotenv from "dotenv";
dotenv.config();


// ייבוא mysql
import mysql2 from 'mysql2'

const pool = mysql2.createPool({
    // connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database:  process.env.DATABASE
   });

   export default pool.promise()