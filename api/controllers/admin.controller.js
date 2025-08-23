import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { ErrorHandler } from '../utils/error.js';
import mongoose from "mongoose";

export const GetAllUser = async (req, res, next)=>{
  try{
       const AllUser = await User.find();
       if(!AllUser || AllUser.length === 0){
        next(ErrorHandler(404, 'no user Founded'));
       }
       res.status(200).json(AllUser);

  }catch(err){
    next(err);
  }
}

export const DeleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return next(new ErrorHandler(404, 'User not found'));
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};