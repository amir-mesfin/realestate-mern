import React from 'react'

export default function CreateListing() {
  return (
     <main>
      <h1 className='text-3xl text-center font-semibold my-9'>Create Listing</h1>
      <form className='flex flex-col sm:flex-row' >
          <div className='flex flex-col gap-4'>
            <input type="text"
                   placeholder='name' 
                   className='border-0 p-4  focus:outline-blue-300 rounded-lg bg-white'  id="name"
                   maxLength={67}
                   minLength={5}
                   required/>
            <textarea type="text"
                   placeholder='Description' 
                   className='border-0 p-4  focus:outline-blue-300 rounded-lg bg-white' 
                    id="description"
                   required/>
            <input type="text"
                   placeholder='Address' 
                   className='border-0 p-4  focus:outline-blue-300 rounded-lg bg-white'  id="address"
                   required/>
          
          </div>
      </form>
     </main>
  )
}
