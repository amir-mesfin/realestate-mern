import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routes/userRouter.js'
import authRouter from './routes/auth.route.js'


const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use("/api",userRouter);
app.use("/api/auth",authRouter )
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
