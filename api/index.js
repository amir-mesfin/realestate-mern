import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routes/userRouter.js'
const app = express();
const PORT = process.env.PORT || 3000


app.use("/api",userRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port",PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });

app.on("error", (err) => {
  console.error("Server error:", err);
});
