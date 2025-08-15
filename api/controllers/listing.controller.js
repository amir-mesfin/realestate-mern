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
      //   console.log('params', req.params.id);
      // console.log('dbListingID',listings._id.toString());
         if(req.params.id !== listings._id.toString()){
            return next(ErrorHandler(401 , 'You are not authorized to delete this listing'));
         }
         await  Listing.findByIdAndDelete(req.params.id);
         res.status(200).json({
            success: true,
            message: 'Listing deleted successfully',
          });

   }catch(err){
      next(err);
   }
}

   
   export const updateListing = async (req, res, next) => {
      const listing = await findByID(req.params.id);

      if(!listing) return next(ErrorHandler(404,'listing not Found'));

      if(req.params.id !== listing._id.toString()){
         return next(ErrorHandler(401 , 'You are not authorized to delete this listing'));
      }
      try{
          const updateListing  = await Listing.findByIdAndUpdate( 
            req.params.id,
            req.body,
           {new: true}
         );
         res.status(200).json(updateListing);
            
      }catch(err){
         next(err);
      }
   }