import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row '>
         {/* leftSide */}
          <div className='p-7 border-b-2 border-white md:border-r-2 md:min-h-screen'>
                  <form 
                       className='flex flex-col gap-13'>
                          <div className='flex items-center gap-4'> 
                            <label 
                              className=' font-semibold whitespace-nowrap'>Search Term</label>
                            <input type="text" 
                             className='border-0 rounded-lg  p-4 w-full bg-white'
                             placeholder='search...'
                             id='searchTerm'/>
                            </div>      
                        <div className='flex gap-2 flex-wrap  items-center'>
                             <label className='font-semibold'>Type :</label>
                             <div className=' flex gap-3'>
                                  <input type="checkbox"
                                          id='all'
                                          className='w-7'/>
                                      <span>rent and sale</span>
                             </div>
                             <div className=' flex gap-3'>
                                  <input type="checkbox"
                                          id='rent'
                                          className='w-7'/>
                                      <span>rent</span>
                             </div>
                             <div className=' flex gap-3'>
                                  <input type="checkbox"
                                          id='sale'
                                          className='w-7'/>
                                      <span>sale</span>
                             </div>
                             <div className=' flex gap-3'>
                                  <input type="checkbox"
                                          id='offer'
                                          className='w-7'/>
                                      <span>offer</span>
                             </div>
                             
                        </div>
                        <div className='flex gap-2 flex-wrap  items-center'>
                             <label className='font-semibold'>Amenities :</label>
                             <div className=' flex gap-3'>
                                  <input type="checkbox"
                                          id='parking'
                                          className='w-7'/>
                                      <span>Parking</span>
                             </div>
                             <div className=' flex gap-3'>
                                  <input type="checkbox"
                                          id='furnished'
                                          className='w-7'/>
                                      <span>Furnished</span>
                             </div>
                             
                             
                        </div>
                        <div className=' flex items-center  gap-4'>
                          <label className='font-semibold' > Sort</label>
                          <select  id=" sort_order"
                                   className='border-0 rounded-lg  p-4 bg-white focus:border-white border-white hover:border-blue-600'>
                                <option value=""> price low to hight</option>
                                <option value=""> price hight to low</option>
                                <option value=""> Latest</option>
                                <option value=""> Oldest</option>
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
