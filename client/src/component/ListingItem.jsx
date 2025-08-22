import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import './listing.css'

export default function ListingItem({ listing }) {
  const {
    _id,
    name,
    description,
    address,
    bathrooms,
    bedrooms,
    discountPrice,
    imageUrl,
    offer,
    regularPrice,
    type,
  } = listing;

  return (
    <div className="bg-white flex-col gap-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 
                    w-full max-w-[350px] sm:max-w-[300px] mx-auto overflow-hidden">
      <Link to={`/listing/${_id}`}>
        <img
          src={imageUrl[0]}
          alt={name}
          className="w-full h-64 sm:h-48 object-cover hover:scale-105 transform transition duration-500"
        />

        <div className="p-5 flex flex-col gap-3">
          {/* Title */}
          <p className="truncate text-lg font-semibold text-slate-700">{name}</p>

          {/* Address */}
          <div className="flex items-center gap-2">
            <MdLocationOn className="h-5 w-5 text-green-700" />
            <p className="text-sm text-gray-600 truncate">{address}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

          {/* Price */}
          <p className="text-slate-500 mt-2 font-semibold">
            $
            {offer
              ? discountPrice.toLocaleString("en-US")
              : regularPrice.toLocaleString("en-US")}
            {type === "rent" && " /month"}
          </p>

          {/* Beds & Baths */}
          <div className="flex gap-4 text-sm font-bold text-slate-700">
            <span>{bedrooms > 1 ? `${bedrooms} beds` : `${bedrooms} bed`}</span>
            <span>{bathrooms > 1 ? `${bathrooms} baths` : `${bathrooms} bath`}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
