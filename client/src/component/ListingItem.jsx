import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import   './listing.css'
export default function ListingItem( { listing }) {
  // console.log(listing);
  const {
    _id,
    name,
    description,
    address,
    bathrooms,
    bedrooms,
    createdAt,
    discountPrice,
    furnished,
    imageUrl,
    offer,
    parking,
    phone,
    regularPrice,
    type,
    updatedAt,
    userRef
  } = listing;
  return (
    <div className='mx-auto  bg-white flex-col gap=8  rounded-lg shadow-md  hover:shadow-xl transition-shadow duration-300 w-[340px] overflow-hidden'>
      <Link to={`/listing/${_id}`} >
      <img src={imageUrl[0]} 
           alt="image"  
          className=' h-[340px] w-[340px] sm:h-[240px] object-cover  hover:scale-115 transform-scale duration-500 rounded-lg'/>
          <div className='p-5 flex flex-col gap-4 w-full '>
              <p className=' truncate text-lg font-semibold text-slate-700 '>{name}</p>

              <div className=' flex items-center gap-2 '>
                  <MdLocationOn className='h-5 w-5 text-green-700 ' />
                  <p className='text-sm text-gray-600'>{address}</p>
            </div>
            <p className='text-sm text-gray-600 clamp-3' >{description}</p>
            <p className=' text-slate-500 mt-2 font-semibold '>$
              {
                 offer ? discountPrice.toLocaleString('en-US') : regularPrice.toLocaleString('en-US')
              }
              {
                type === 'rent' && '  /month'
              }
            </p>
              <div className=' flex gap-4'>
                    <div className='font-bold text-xsm  text-slate-700'>
                      { bedrooms > 1 ?  `${bedrooms} beds` : `${bedrooms} bed` }
                    </div>
                    <div className='font-bold text-xsm  text-slate-700'>
                      { bathrooms > 1 ?  `${bathrooms} baths` : `${bathrooms} bath` }
                    </div>
              </div>
          </div>
         
      </Link>
    </div>
  )
}
 