import express, { query } from "express";
import { appendFile } from "fs";
import fetch from "node-fetch";
// ייבוא של הקלאס
import Writers from "../controllers/WritersClass.js";



const writers = new Writers();
const router = express.Router();



// קריאה והצגת קובץ JSON
router.get("/register", writers.showWriters);

// החזרת פרטי מוצר לפי ID
router.get("/:id", writers.showWritersById);

// דף הוספת משתמשים
router.post("/add", writers.addWriters);

// מחיקת משתמש
router.delete("/:id", writers.deleteWriters);

// עדכון משתמש
router.put("/", writers.updateWriters);

router.post('/login', writers.login)





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
