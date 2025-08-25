import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function SellerUpdate() {
  const [userListing, setUserListing] = useState([]);
  const [showListing, setShowListing] = useState(false);
  const [listingDeleteError, setListingDeleteError] = useState(null);
  const [ShowListingError , setShowListingError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(()=>{
    const handleShowList = async() =>{
      try{
        setShowListingError(null);
          const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if(data.success === false){
          setShowListingError(data.message);
          return;
        }
        // console.log(data);
        setUserListing(data);
          
      }catch(error){
        setShowListingError(error.message);
      }
       setShowListing(true);
  
   }
   handleShowList();
  },[])

  const handleListingDelete = async(listingId) =>{
    try{
          const res = await fetch(`/api/listing/delete/${listingId}`,{
            method: 'DELETE',
          });
          const data = await res.json();
          if(data.success === false){
            setListingDeleteError(data.message);
           return; 
          }
          setUserListing((prev) => prev.filter((listing) => listing._id !== listingId));

    }catch(err){
      setListingDeleteError(err.message)
    }
      
   }

  if (userListing.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
         <h1 className=' text-center  my-7 text-2xl font-semibold '>Your Listing  Real_state</h1>
        <p className="text-gray-600 text-base sm:text-lg">
          No Real_state has listed You.
        </p>
        {ShowListingError && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <div className= 'flex flex-col '>
              <h1 className=' text-center  my-7 text-2xl font-semibold '>Your Listing  Real_state</h1>
              {
                    userListing.map((list) =>(
                      <div key={list._id}
                           className=' border-amber-300 bg-amber-50 rounded-lg  p-5 flex justify-between items-center my-5 gap-7'
                           > 
                           <Link to={`/listing/${list._id}`}>
                           <img className='w-18 h-18 object-contain rounded-xl '
                              src={list.imageUrl[0]} alt="listing ate" />
                           
        
                           </Link>
                           <Link
                                to={`/listing/${list._id}`}
                                className="flex-1"
                              >
                                <p className="text-slate-700 hover:underline truncate font-semibold overflow-hidden whitespace-nowrap max-w-[200px]">
                                  {list.name}
                                </p>
                              </Link>

                           <div className='flex flex-col gap-4 '>
                                 <button className='text-red-700  p-2  hover:bg-amber-100 rounded-xl uppercase'
                                  onClick={() => handleListingDelete(list._id)}>delete</button>
                                 <Link to={`/update-listing/${list._id}`}> 
                                     <button className='text-green-400 py-2  px-7 hover:bg-amber-100 rounded-xl uppercase'>edit</button>
                                  </Link>
                                
                           </div>
               
                      </div>
                      
                    ))
              }
                <p className='text-sm text-red-800'>{listingDeleteError && listingDeleteError}</p>
            </div>
    </div>
  )
}
