import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routes/userRouter.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT || 3000



// console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port",PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });


app.use(cookieParser());
app.use(express.json());


app.use("/api/user",userRouter);
app.use("/api/auth",authRouter );
app.use("/api/listing",listingRouter);



app.use((err,req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message ||'internal Server Error';
  return res.status(statusCode).json({ 
     message,
     success:false,
     statusCode
  })
});
