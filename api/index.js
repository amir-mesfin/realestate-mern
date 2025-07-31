import express from 'express';
import connectDB from './config/db.js';

const app = express();

app.get('/', (req, res) => {
  console.log("Hello Abushe");
  res.send("Welcome!");
});

connectDB()
  .then(() => {
    app.listen(3434, () => {
      console.log("Server is running on port 3434");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });

app.on("error", (err) => {
  console.error("Server error:", err);
});
