import User from "../models/user.model.js";
import { ErrorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export  const testing = (req,res)=>{
  res.json({id:1,name:"abushe"});
}


export const updateProfile = async(req,res,next)=>{
if(req.user.id !== req.params.id) return next(ErrorHandler(403,'forbidden to update'));
try{
    if(req.body.password){
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser =  await User.findByIdAndUpdate(req.params.id,{
      $set:{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        avatar:req.body.avatar,
      }
    },{new: true} )

    const {password:pass, ...reset} = updateUser._doc ;
    res.status(200).json(reset);
}catch(err){
  next(err)
}
}

export const deleteUSer = async(req,res,next)=>{
 if(req.user.id !== req.params.id) return next(ErrorHandler(401,"can not delete account"));
 try{
  await User.findByIdAndDelete(req.params.id);
  res.clearCookie('token', { httpOnly: true });
  res.status(200).json('user has been deleted');
}catch(err){
  next(err);
}
}