import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { ErrorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

// export  const testing = (req,res)=>{
//   res.json({id:1,name:"abushe"});
// }


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


export const  getUserListing = async (req,res,next)=>{
  if(req.user.id !== req.params.id) return next(ErrorHandler(401,"you can view your own listing "));
  try{
         const Listings = await Listing.find({userRef:req.params.id});
         res.status(200).json(Listings);
  }catch(err){
    next(err);
  }
}

export const getUSer = async(req, res, next)=>{
  // console.log(req.params.id);
  try{
   const user = await User.findById(req.params.id);
   if(!user){
    next(ErrorHandler(404, 'user not Found'));
    return;
   }
   const {password, ...rest} = user._doc;
   res.status(200).json(rest);
  //  console.log(rest);
  }catch(err){
   next(err);
  // console.log(err);
  }
}


export const requestSeller = async(req, res, next) =>{
  // console.log(req.params.id);
   try{
    const user = await User.findById(req.params.id);
    if(!user) {
      next(ErrorHandler(404, 'user not Found'));
      return;
    }
    user.sellerRequest = true;
    await user.save();

    // console.log(user);
  
    res.json({ message: "Your seller request has been received. Our team will review it, and you will receive a response within 24 hours" });
   }catch(err){
    next(err);
   }
}


export const getRequest = async(req, res, next) =>{
    try{
      const requests = await User.find({ sellerRequest:true, role: "user" });
      if(!requests) {
        next(ErrorHandler(404, 'user not Found'));
        // console.log('requests');
        return;
      }
      res.json(requests);
    }catch(err){
      next(err);
    }
}

//acceptane reuest Seller 

export const acceptanceRequestSeller = async(req,res , next)=>{
  try{
        const id = req.params.id ;
        const user =await  User.findById(id);
        if(!user){
          // console.log('user');
          return next(ErrorHandler(404, 'user not Found'));
        }
       user.role = "seller";
       user.sellerRequest = false;
       await user.save();
       res.json({ success:true,  message: "User upgraded to seller." });
  }catch(err){
    next(err)
  }
}



export const makeAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return next(ErrorHandler(404, 'email is require'));
    const user = await User.findOne({ email });

    if (!user)  return next(ErrorHandler(404, 'user not Found'));
    user.role = "admin";
    await user.save();

    res.json({ success: true, message: `${email} is now an admin` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};