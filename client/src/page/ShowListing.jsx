import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";



export default function ShowListing() {
  const [userListing, setUserListing] = useState([]);
  const [showListing, setShowListing] = useState(false);
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
 
  if (userListing.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
         <h1 className=' text-center  my-7 text-2xl font-semibold '>Your Listing  Real_state</h1>
        <p className="text-gray-600 text-base sm:text-lg">
          No Real_state has listed You.
        </p>
        {ShowListingError && <p className="text-red-500 mt-2">{ShowListingError}</p>}
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
               
                      </div>
                      
                    ))
              }
            </div>
    </div>
  )
}
