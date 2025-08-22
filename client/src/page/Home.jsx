import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'
import SwiperCore from 'swiper';
import ListingItem from '../component/ListingItem';
export default function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const[error, setError]=useState(null);
  SwiperCore.use([Navigation]);
  useEffect(()=>{

  //  offer fetch function
       const fetchOfferListing = async ()=>{
         try{
           const res = await fetch(`/api/listing/get?offer=true&limit=4`);
           const data = await res.json();
           if(data.success === false){
            setError(data.message);
            return;
           }
           setOfferListing(data);
           fetchRentListing();
         }catch(err){
          setError(err);
          console.log(error);
         }
       }
       fetchOfferListing();


  //  rent fetch function
       const fetchRentListing = async ()=>{
        try{
          const res = await fetch(`/api/listing/get?type=rent&limit=4`);
          const data = await res.json();
          if(data.success === false){
           setError(data.message);
           return;
          }
          setRentListing(data);
          fetchSaleListing();
        }catch(err){
         setError(err);
         console.log(error);
        }
    
        
      }

  //  sale fetch function
      const fetchSaleListing = async ()=>{
        try{
          const res = await fetch(`/api/listing/get?type=sale&limit=4`);
          const data = await res.json();
          if(data.success === false){
           setError(data.message);
           return;
          }
          setSaleListing(data);
        }catch(err){
         setError(err);
         console.log(error);
        }
    
        
      }
  },[])
//  console.log(rentListing);
//  console.log(saleListing);
//  console.log(offerListing);
//  console.log(error);
  return (
    <div>
       {/* topside */}
        <div className=' flex flex-col gap-6  py-20 px-5 max-w-6xl mx-auto'>
             <h1 className='text-slate-700 font-bold text-3xl  lg:text-6xl  '>
                find your next  <span className='text-slate-500'> perfect </span> 
                 <br/>
                place with ease
             </h1>
             <div className='text-gray-400 text-xs sm:text-sm '>
                 Abushe Real-state is the most place to find your next perfect place to to live 
                 <br/>
                 We have a wide range of properties for you to  choose from.
             </div>
             <Link to={'search'}
                  className=' text-blue-800 hover:underline   font-bold'>
                    Let's get start now ...
             </Link>
        </div>

       {/* awiper */}
       <Swiper navigation>
         {
            offerListing && offerListing.length > 0 && 
            offerListing.map((listing)=>(
                 <SwiperSlide>
                          <div className='h-[500px] '
                                style={{background : `url(${listing.imageUrl[0]})  center no-repeat`, backgroundSize:`cover`}}
                              key={listing._id}>
                                                       
                          </div>
                 </SwiperSlide>
            ))
           }
       </Swiper>
          

       {/* listing result for offer  sell and rent */}

       <div 
         className=' max-w-8xl mx-auto p-3 flex flex-col  gap-8 my-10  '>

           {/* offer */}
           {
            offerListing && offerListing.length > 0 && (

              <div className='mx-auto'>
                  <div className='my-3'> 
                  <h2 className='text-2xl font-semibold text-slate-600'>
                       Resent Offer 
                     </h2>
                     <Link to={`/search?offer=true`}
                           className='text-sm text-blue-800 font-semibold hover:underline' >
                         Show more OFFER....
                     </Link>
                  </div>
                    
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {offerListing.map((listing) => (
                            <ListingItem key={listing._id} listing={listing} />
                          ))}
                </div>

              </div>
            )
           }
           



           {/* rent */}
           {
            rentListing && rentListing.length > 0 && (

              <div className='mx-auto'>
                  <div className='my-3'> 
                  <h2 className='text-2xl font-semibold text-slate-600'>
                  Resent  place for Rent
                     </h2>
                     <Link to={`/search?offer=true`}
                           className='text-sm text-blue-800 font-semibold hover:underline' >
                          Show more place RENT...
                     </Link>
                  </div>
                    
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {rentListing.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))}
                </div>

              </div>
            )
           }



           {/* sale */}
           {
            saleListing && saleListing.length > 0 && (

              <div className='mx-auto'>
                  <div className='my-3'> 
                  <h2 className='text-2xl font-semibold text-slate-600'>
                       Resent  place for Sale
                     </h2>
                     <Link to={`/search?offer=true`}
                           className='text-sm text-blue-800 font-semibold hover:underline' >
                         Show more place SALE...
                     </Link>
                  </div>
                    
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {saleListing.map((listing) => (
                            <ListingItem key={listing._id} listing={listing} />
                          ))}
                </div>

              </div>
            )
           }
         </div>

    </div>
  )
}
