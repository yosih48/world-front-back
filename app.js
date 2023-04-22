import express, { response } from "express";
import cors from 'cors'
// ייבוא של PATH דרך IMPORT
import path from "path";


// קריאה לפורט מקובץ .ENV
import * as dotenv from 'dotenv'
dotenv.config();
console.log(process.env.HOST);


import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// קריאה לקובץ rout

import users from "./src/routes/users.js";
import guesses from "./src/routes/guesses.js";
const app = express();

app.use(express.json());

//urlencoded
// פרסור גייסון

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);
// app.use(cors({ origin: process.env.REMOTE_CLIENT_APP, credentials: true }));

// app.use("/product", product);
app.use("/guesses", guesses);
app.use("/users", users);

  
  // הגדרת תיקייה סטטית
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "../../world-front/dist/index.html")));

// הגדרת פורט
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

