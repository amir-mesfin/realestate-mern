import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { ErrorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req,res, next)=>{
   // console.log(req.body);
         const {username, email, password} = req.body;
         const hashPassword = bcryptjs.hashSync(password,10);
         const newUser = new User({username, email, password:hashPassword});
   try{
         await newUser.save();
         res.status(201).json("user created successfully");
   }catch(err){
      next(err);
   };
   
};

export const signin = async (req,res,next) =>{
     const {email,password} = req.body;

 try{
      const validUSer = await User.findOne({email}).lean();
      if(!validUSer) return next(ErrorHandler(404,"user not found please Register"));
      const  validPassword = bcryptjs.compareSync(password, validUSer.password);
      if(!validUSer) return next(ErrorHandler(401,"Invalid password Please inter Correct Password"));
      const token  = jwt.sign({id:validUSer._id},process.env.JWT_SECRET);
      const{password:pass, ...rest} = validUSer
      res
            .cookie('token',token,{httpOnly: true})
            .status(201)
            .json(rest);

 }catch(err){
  next(err)
 };
};