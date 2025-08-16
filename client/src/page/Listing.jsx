import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FadeLoaderComponent from '../component/FadeLoaderComponent ';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from 'swiper/modules';
import  SwiperCore from 'swiper';



export default function Listing() {
  const param = useParams();
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)
  const  listingId = param.listingId;
  // cg
  useEffect(()=>{
     const fetchListing = async () =>{
      try{
        const res = await fetch(`/api/listing/getList/${listingId}`);
        const data = await res.json();
        if(data.success === false){
          setError(false);
          setLoading(false);
          return;
        }
        setListing(data);
      }catch(err){
         setError(true);
      }
       
      }
     fetchListing();
     setLoading(false)
     setError(null);
  },[listingId])
  console.log(listing);
  if (loading) return <FadeLoaderComponent />;
  return (
    <div className=''>
  {error && <p className="text-red-500 text-2xl mt-45 text-center items-center">something went to Wrong</p>}
  {listing && !loading &&  !error && ( 
    <>
       <Swiper navigation>
          {
             listing.imageUrl.map((url) =>(
                <SwiperSlide key={url} >
                     <div className='h-[590px]' 
                          style={{background: `url(${url}) center no-repeat` , backgroundSize: 'cover'}}> 

                     </div>
                </SwiperSlide>
             ))
          }
       </Swiper>
    </>
    )}
</div>
  )
}
