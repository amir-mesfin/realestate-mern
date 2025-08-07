import { ErrorHandler } from "./error.js";
import jwt from 'jsonwebtoken'
export const verifyToken = (req, res, next)=>{

const token = req.cookies.token;
if(!token) return  next(ErrorHandler(404,"unauthorized"));

jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{ 
  if(err) return next(ErrorHandler(403,'forbidden to access'));

  req.user = user;
  next();
});
} ;