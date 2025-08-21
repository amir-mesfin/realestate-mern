import React, {useState, useEffect}from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  const [sideBarData, setSideBarData] = useState({
        searchTerm:'',
        type:"all",
        parking: false,
        furnished:false,
        offer:false,
        sort:'created-at',
        order:'desc',

  });
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [error, setError] = useState(null);
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);

    const searchTermFormUrl = urlParams.get('searchTerm');
    const typeFormUrl = urlParams.get('type');
    const furnishedFormUrl = urlParams.get('furnished');
    const parkingFormUrl = urlParams.get('parking');
    const offerFormUrl = urlParams.get('offer');
    const orderFormUrl = urlParams.get('order');
    const sortFormUrl = urlParams.get('sort');
  if(
    searchTermFormUrl ||
    typeFormUrl ||
    furnishedFormUrl ||
    parkingFormUrl ||
    offerFormUrl ||
    orderFormUrl ||
    sortFormUrl
  ){
      setSideBarData({
        searchTerm:searchTermFormUrl ||'',
        type:typeFormUrl ||  "all",
        parking: parkingFormUrl === true ? true: false,
        furnished: furnishedFormUrl === true ? true : false,
        offer:offerFormUrl === true ? true : false,
        sort:sortFormUrl || 'created-at',
        order:orderFormUrl || 'desc',
      }); 
  }

  const fetchListingData = async ()=>{
       setLoading(true);
       const  searchQuery = urlParams.toString();
       const res = await fetch(`/api/listing/get?${searchQuery}`);
       const data  = await res.json();
      if(data.success === false){
        setError(data.message);
        return;
      }
       setListing(data);
       setLoading(false)
  }

  fetchListingData();

} , [location.search])
console.log(listing);
console.log(error);

  // console.log(sideBarData);
  const handleChange = (e) =>{
    // console.log(e.target.id)
      if(e.target.id === 'all' ||
         e.target.id === 'rent' || 
        e.target.id === 'sale' ){
          setSideBarData( {
             ...sideBarData,
             type:e.target.id,
          });
        }
        if( e.target.id === 'searchTerm'){
            setSideBarData({
              ...setSideBarData,
              searchTerm:e.target.value,
            });
            }

        if(e.target.id=== 'parking' ||
          e.target.id=== 'furnished' ||
          e.target.id=== 'offer' 
        ){
           setSideBarData({
            ...sideBarData,
            [e.target.id]:e.target.checked || e.target.checked === 'true'? true :false ,
           });
        }

        if(e.target.id === 'sort_order'){
          // console.log(e.target.id);
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1]  || 'desc'
            setSideBarData({
              ...sideBarData,
              sort,
              order,
            })
        }
         
  }


  const handleSubmit = (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams();

    urlParams.set('searchTerm', sideBarData.searchTerm)
    urlParams.set('type', sideBarData.type)
    urlParams.set('parking', sideBarData.parking)
    urlParams.set('furnished', sideBarData.furnished)
    urlParams.set('offer', sideBarData.offer)
    urlParams.set('sort', sideBarData.sort)
    urlParams.set('order', sideBarData.order)
   
   const searchQuery = urlParams.toString();
     navigate(`/search?${searchQuery}`)
  }
  return (
    <div className='flex flex-col md:flex-row '>
         {/* leftSide */}
          <div className='p-7 border-b-2 border-white md:border-r-2 md:min-h-screen'>
                  <form onSubmit={handleSubmit}
                       className='flex flex-col gap-13'>
                          <div className='flex items-center gap-4'> 
                            <label 
                              className=' font-semibold whitespace-nowrap'>Search Term</label>
                            <input type="text" 
                             className='border-0 rounded-lg  p-4 w-full bg-white'
                             placeholder='search...'
                             id='searchTerm'
                             value={sideBarData.searchTerm}
                             onChange={handleChange}/>
                            </div>      
                        <div className='flex gap-2 flex-wrap  items-center'>
                             <label className='font-semibold'>Type :</label>
                             <div className=' flex gap-3'>
                                  <input type="checkbox"
                                          id='all'
                                          className='w-7'
                                          onChange={handleChange}
                                          checked={sideBarData.type === 'all'}/>
                                      <span>rent and sale</span>
                             </div>
                             <div className=' flex gap-3'>
                                  <input type="checkbox"
                                          id='rent'
                                          className='w-7'
                                          onChange={handleChange}
                                          checked={sideBarData.type === 'rent'}/>
                                      <span>rent</span>
                             </div>
                             <div className=' flex gap-3'>
                                  <input type="checkbox"
                                          id='sale'
                                          className='w-7'
                                          onChange={handleChange}
                                          checked={sideBarData.type === 'sale'}/>
                                      <span>sale</span>
                             </div>
                             <div className=' flex gap-3'>
                                  <input type="checkbox"
                                          id='offer'
                                          className='w-7'
                                          onChange={handleChange}
                                          checked={sideBarData.offer}/>
                                      <span>offer</span>
                             </div>
                             
                        </div>
                        <div className='flex gap-2 flex-wrap  items-center'>
                             <label className='font-semibold'>Amenities :</label>
                             <div className=' flex gap-3'>
                                  <input type="checkbox"
                                          id='parking'
                                          className='w-7'
                                          onChange={handleChange}
                                          checked={sideBarData.parking}/>
                                      <span>Parking</span>
                             </div>
                             <div className=' flex gap-3'>
                                  <input type="checkbox"
                                          id='furnished'
                                          className='w-7'
                                          checked={sideBarData.furnished}
                                          onChange={handleChange}
                                          />
                                      <span>Furnished</span>
                             </div>
                             
                             
                        </div>
                        <div className=' flex items-center  gap-4'>
                          <label className='font-semibold' > Sort</label>
                          <select  id="sort_order"
                                   className='border-0 rounded-lg  p-4 bg-white focus:border-white border-white hover:border-blue-600'
                                   onChange={handleChange}
                                   defaultValue={'created_at_desc'}
                                    >
                                <option value="regularPrice_desc"> price low to hight</option>
                                <option value="regularPrice_asc"> price hight to low</option>
                                <option value="createdAt_desc"> Latest</option>
                                <option value="createdAt_asc"> Oldest</option>
                          </select>
                        </div>
                        <button className='bg-slate-700 rounded-lg p-4 text-white hover:opacity-85 uppercase cursor-pointer'> Search</button>
                  </form>
          </div>
          {/* right side */}
          <div className=''>
                  <h1
                   className='text-3xl p-3 font-semibold border-b text-slate-800 '>Listing result</h1>
          </div>
    </div>
  )
}
