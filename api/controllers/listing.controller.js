import Listing from '../models/listing.model.js';
import { ErrorHandler } from '../utils/error.js';
import mongoose from "mongoose";

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
      const listing = await Listing.findById(req.params.id);

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



   export const getUpdateList = async (req, res, next) => {
     try {
       const id = req.params.id.trim(); // remove spaces/newlines
   
       // Validate ObjectId
       if (!mongoose.Types.ObjectId.isValid(id)) {
         return next(ErrorHandler(400, "Invalid listing ID"));
       }
   
       const listing = await Listing.findById(id);
   
       if (!listing) {
         return next(ErrorHandler(404, "Listing not found"));
       }
   
       res.status(200).json(listing);
     } catch (err) {
       next(err);
     }
   };
   

   export const getListing = async(req, res, next) =>{
      try{
              const limit = parseInt(req.query.limit) || 10 ;
              const startIndex = parseInt(startIndex) || 0 ;
              let offer = require.query.offer;

              if(offer === undefined || offer === 'false'){
               offer = {$in : [false, true]};
              }
              
              let furnished = req.query.furnished;
              if(furnished === undefined || furnished === 'false'){
               furnished = {$in : [false, true]};
              }

              let parking = req.query.parking;
              if(parking === undefined || parking === 'false'){
               parking = {$in : [false, true]};
              }

              let type = req.query.type;
              if(type === undefined || type === 'all'){
               type = {$in : ['sale', 'rent']}
              }

              const searchTerm = req.query.searchTerm;
              
              const sort = req.query.sort || 'createdAt';

              const order = req.query.order || 'desc';

              const listing  = await Listing.find({
                name:{ $regex: searchTerm, $options: 'i'},
                offer,
                furnished,
                parking,
                type,
              }).sort({
               [sort]: order
              }).limit(limit).skip(startIndex);

             return res.status(200).json(listing);
      }catch(err){
         next(err);
      }
   }