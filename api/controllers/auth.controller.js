import User from '../models/user.model.js'
import bcryptjs, { hashSync } from 'bcryptjs';
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
      if(!validPassword) return next(ErrorHandler(401,"Invalid password Please inter Correct Password"));
      const token  = jwt.sign({id:validUSer._id},process.env.JWT_SECRET);
      const{password:pass, ...rest} = validUSer
      res
            .cookie('token',token,{httpOnly: true})
            .status(200)
            .json(rest);

 }catch(err){
  next(err)
 };
};

export const google = async (req, res, next) => {
      const { email, name, photo } = req.body;
      try {
      
        const user = await User.findOne({ email }).lean();
    
        if (user) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          const { password: pas, ...rest } = user;
          return res
            .cookie('token', token, { httpOnly: true })
            .status(200)
            .json(rest);
        } else {
          // Generate random password
          const generatePassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
    
          const hashPassword = bcryptjs.hashSync(generatePassword, 10);
    
          // Generate unique username \
          const username =
            name.split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-4) +
            Math.random().toString(36).slice(-4);
    
          // Create new user
          const newUser = new User({
            username,
            email,
            password: hashPassword,
            avatar: photo
          });
    
          await newUser.save();
    
          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
          const { password: pas, ...rest } = newUser.toObject();
          
           res
            .cookie('token', token, { httpOnly: true })
            .status(200)
            .json(rest);
        }
      } catch (err) {
        next(err);
      }
    };
    

  
