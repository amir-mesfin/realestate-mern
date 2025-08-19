import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
         {/* leftSide */}
          <div className='p-7 border-b-2 md:border-r-2'>
                  <form action="">
                          <div className='flex items-center gap-4'> 
                            <label 
                              className='whitespace-nowrap'>Search Term</label>
                            <input type="text" 
                             className='border-0 rounded-lg  p-4 w-full bg-white'
                             placeholder='search...'
                             id='searchTerm'/>
                            </div>      
                  </form>
          </div>
          {/* right side */}
          <div className=''>
                  <h1>Listing result</h1>
          </div>
    </div>
  )
}
