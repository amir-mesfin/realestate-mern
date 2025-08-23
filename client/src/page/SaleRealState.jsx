import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";

export default function SaleRealState() {
  const [offerListing, setOfferListing] = useState([]);
  const [error, setError] = useState(null);
  // Example: multiple offers
  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }

        const listings = data; 

        const listingsWithUsers = await Promise.all(
          listings.map(async (listing) => {
            try {
              const userRes = await fetch(`/api/user/${listing.userRef}`);
              const userData = await userRes.json();
              return { ...listing, owner: userData }; 
            } catch (err) {
              console.error("Error fetching owner:", err);
              return { ...listing, owner: null };
            }
          })
        );

        // 3. Save to state
        setOfferListing(listingsWithUsers);
      } catch (err) {
        setError(err.message || "Something went wrong");
        console.error(err);
      }
    };

    fetchOfferListing();
  }, []);

// console.log(offerListing);

const handleListingDelete = async(listingId) =>{
  try{
        const res = await fetch(`/api/listing/delete/${listingId}`,{
          method: 'DELETE',
        });
        const data = await res.json();
        if(data.success === false){
          setError(data.message);
         return; 
        }
        setOfferListing((prev) => prev.filter((listing) => listing._id !== listingId));

  }catch(err){
    setError(err.message)
  }
    
 }
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-blue-900 text-2xl font-bold text-center mb-2">
        Offer Real Estate
      </h1>

      {/* List of offer cards */}
      <div className="flex flex-col gap-4">
        {offerListing.map((offer) => (
          <div
            key={offer._id}
            className="bg-white rounded-xl shadow-md p-3 flex flex-col md:flex-row gap-3 md:gap-4 items-start w-full"
          >
            {/* Property Image */}
            <div className="flex-shrink-0 w-full md:w-32">
              <img
                src={offer.imageUrl[0]}
                alt={offer.name}
                className="w-full h-32 md:h-40 rounded-xl object-cover"
              />
            </div>

            {/* Property Details */}
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-slate-700 font-semibold">{offer.name}</p>
              <p className="text-red-500 font-bold">
                Discount Price: {offer.discountPrice}
              </p>
              <p className="text-slate-500 line-through">{offer.regularPrice}</p>
              <div className="flex flex-wrap gap-3 mt-1">
                <p className="flex items-center gap-1 text-slate-700">
                  <FaBed className="text-blue-500" /> {offer.bedrooms} Beds
                </p>
                <p className="flex items-center gap-1 text-slate-700">
                  <FaBath className="text-blue-500" /> {offer.bathrooms} Baths
                </p>
              </div>
              <p className="flex items-center gap-2 mt-1 text-slate-700 font-semibold text-sm md:text-base">
                <FaMapMarkerAlt className="text-red-500" /> {offer.address}
              </p>
            </div>

            {/* Owner Info */}
            <div className="flex flex-col items-center gap-1 mt-2 md:mt-0 w-full md:w-auto">
              <h3 className="text-slate-600 font-semibold text-sm md:text-base">
                Owner
              </h3>
              <img
                src={offer.owner.avatar}
                alt={offer.owner.username}
                className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover"
              />
              <p className="text-center text-slate-700 font-semibold text-sm md:text-base">
                {offer.owner.username}
              </p>
              <p className="text-center text-blue-500 text-xs md:text-sm">
                {offer.owner.email}
              </p>
              <button className="mt-1 px-3 py-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition text-xs md:text-sm"
                onClick={() => handleListingDelete(offer._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
