import express, { query } from "express";
import { appendFile } from "fs";
import fetch from "node-fetch";
import auth from '../middle/auth.js'
// ייבוא של הקלאס
import Guess from "../controllers/guessesClass.js";



const user = new Guess();
const router = express.Router();

// router.get('/', User.users);

// קריאה והצגת קובץ JSON
router.get("/register",user.showUsers);

// כניסת משתמש
router.post('/login', user.login)
// router.get('/login', User.login)

// החזרת פרטי מוצר לפי ID
router.get("/:id", user.showUserById);
router.get("/game/:id", user.games);

// דף הוספת משתמשים
router.post("/add", user.addUser);

// עדכון משתמש
router.put("/", user.updateUser);

// מחיקת משתמש
router.delete("/:id", user.deleteUser);

router.get('/info/userinfo', user.userinfo)

router.post("/games", user.games);




// הגדרת שגיאה במידלוור
router.use((req, res, next) => {
  const error = new Error("the page is Not Found");
  error.status = 404;
  next(error);
});
// הצגת השגיאה
router.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default router;
