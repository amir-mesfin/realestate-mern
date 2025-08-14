import Listing from '../models/listing.model.js';
import { ErrorHandler } from '../utils/error.js';

export  const createListing  = async (req,res,next)=>{
   try{
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
   }catch(err){
    next(err);
   }
} 

export const deleteListing =  async(req,res,next)=>{
   try{
        const listings = await Listing.findById(req.params.id);
        if(!listings) return next(ErrorHandler(404, 'Listing not Found'))
        
         if(req.params.id !== listings.userRef){
            return next(ErrorHandler(401 , 'You are not authorized to delete this listing'));
         }
         await  Listing.findByIdAndDelete(req.params.id);
         

   }catch(err){
      next(err);
   }
}