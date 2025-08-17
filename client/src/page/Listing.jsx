import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FadeLoaderComponent from '../component/FadeLoaderComponent';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import { FaBed, FaBath, FaParking, FaChair, FaHeart } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { BsCurrencyDollar, BsShareFill } from 'react-icons/bs';
import { IoIosResize } from 'react-icons/io';
import Contact from '../component/Contact';

export default function Listing() {
  const param = useParams();
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const listingId = param.listingId;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/getList/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
    fetchListing();
  }, [listingId]);

  if (loading) return <FadeLoaderComponent />;

  return (
    <div className='min-h-screen bg-gray-50'>
      {error && (
        <p className="text-red-500 text-2xl text-center py-10">
          Something went wrong. Please try again later.
        </p>
      )}
      
      {listing && !loading && !error && (
        <>
          {/* Full-width Image Gallery (now outside container) */}
          <div className='w-full relative'>
            <Swiper 
              navigation 
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              loop={true}
              className='w-full'
            >
              {listing.imageUrl.map((url) => (
                <SwiperSlide key={url}>
                  <div 
                    className='w-full h-[50vh] md:h-[55vh] lg:h-[65vh]'
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: 'cover'
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='absolute top-4 right-4 z-10 flex gap-2'>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800'}`}
              >
                <FaHeart className='text-lg' />
              </button>
              <button className='p-2 rounded-full bg-white/90 text-gray-800'>
                <BsShareFill className='text-lg' />
              </button>
              <button className='p-2 rounded-full bg-white/90 text-gray-800'>
                <IoIosResize className='text-xl' />
              </button>
            </div>
          </div>

          {/* Content Container */}
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20'>
            <div className=' gap-8 -mt-8 relative z-0'>
              <div className='md:col-span-2'>
                {/* Property Header */}
                <div className='mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                  <h1 className='text-3xl font-bold text-slate-800 mb-2'>
                    {listing.name}
                  </h1>
                  
                  <div className='flex items-center text-slate-600 mb-4'>
                    <MdLocationOn className='text-emerald-600 mr-1' />
                    <span>{listing.address}</span>
                  </div>

                  {/* Price Badge */}
                  <div className='flex flex-wrap items-center gap-4'>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      listing.type === 'rent' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                    {listing.offer && (
                      <div className='flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-lg'>
                        <span className='text-lg line-through text-gray-500 mr-2'>
                          ${listing.regularPrice.toLocaleString()}
                        </span>
                        <span className='text-2xl font-bold text-emerald-700 flex items-center'>
                          <BsCurrencyDollar className='mr-1' />
                          {listing.discountPrice.toLocaleString()}
                        </span>
                        <span className='text-gray-500 ml-1'>
                          {listing.type === 'rent' ? '/month' : ''}
                        </span>
                      </div>
                    )}
                    {!listing.offer && (
                      <div className='bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-lg'>
                        <span className='text-2xl font-bold text-emerald-700 flex items-center'>
                          <BsCurrencyDollar className='mr-1' />
                          {listing.regularPrice.toLocaleString()}
                          <span className='text-gray-500 ml-1 text-lg'>
                            {listing.type === 'rent' ? '/month' : ''}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className='mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                  <h2 className='text-xl font-semibold text-slate-800 mb-3'>Description</h2>
                  <p className='text-gray-700 leading-relaxed'>{listing.description}</p>
                </div>

                {/* Amenities */}
                <div className='mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
                  <h2 className='text-xl font-semibold text-slate-800 mb-4'>Amenities</h2>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div className='flex items-center bg-blue-50 px-4 py-3 rounded-lg'>
                      <FaBed className='text-lg mr-2 text-blue-600' />
                      <span>{listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
                    </div>
                    <div className='flex items-center bg-blue-50 px-4 py-3 rounded-lg'>
                      <FaBath className='text-lg mr-2 text-blue-600' />
                      <span>{listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
                    </div>
                    {listing.parking && (
                      <div className='flex items-center bg-blue-50 px-4 py-3 rounded-lg'>
                        <FaParking className='text-lg mr-2 text-blue-600' />
                        <span>Parking</span>
                      </div>
                    )}
                    {listing.furnished && (
                      <div className='flex items-center bg-blue-50 px-4 py-3 rounded-lg'>
                        <FaChair className='text-lg mr-2 text-blue-600' />
                        <span>Furnished</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className='bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit sticky top-4 mx-auto items-center '>
                <div className='mb-4'>
                  <h3 className='text-xl font-semibold text-gray-800'>Contact Landlord</h3>
                  <p className='text-gray-600 mt-1'>
                    Interested in this property? Reach out to the landlord for more information.
                  </p>
                </div>
                <button
                  onClick={() => setContact(true)}
                  className='w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg hover:opacity-90 transition duration-200 font-medium'
                >
                  Contact Now
                </button>
                {contact && <Contact listing={listing} />}
                
                {/* Additional Info */}
                <div className='mt-6 pt-6 border-t border-gray-200'>
                  <h4 className='font-medium text-gray-800 mb-2'>Property Details</h4>
                  <ul className='space-y-2 text-gray-600'>
                    <li className='flex justify-between'>
                      <span>Type:</span>
                      <span className='font-medium capitalize'>{listing.type}</span>
                    </li>
                    <li className='flex justify-between'>
                      <span>Offer:</span>
                      <span className='font-medium'>{listing.offer ? 'Yes' : 'No'}</span>
                    </li>
                    <li className='flex justify-between'>
                      <span>Listed:</span>
                      <span className='font-medium'>{new Date(listing.createdAt).toLocaleDateString()}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}