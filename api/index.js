import express from 'express';

const app = express();

app.get('/',(req,res)=>{
   console.log(abushe)
})

app.listen(3434,()=>{
  
  console.log("server is running");
});

app.on("error",(err)=>{
  throw new Error("the server is not working due to "+ err)
});