import React, { useState, useEffect } from 'react'

export default function CreateListing() {
       const [forData, setFormData] = useState({
              imageUrl:[],
       });
       const [files, setFile] = useState([]);
       const [err, SetErr]= useState(null);
       const [uploading, setUploading] = useState (false);
       const[imageUploadError, setImageUPloadError] = useState(false);
       // console.log(files);
       const handleImageSubmit = async(e) =>{
           setUploading(true);
           if(files.length === 0 || forData.imageUrl.length > 7 || files.length>7) {
              setImageUPloadError('Please upload at least 1 file and no more than 7');
              setUploading(false);
              return;
           }

           for (const img of files) {
              if (!img.type.startsWith('image/')) {
                     setImageUPloadError('Please upload an image file');
                     setUploading(false);
                return;
              }
              if (img.size > 5 * 1024 * 1024) {
                     setImageUPloadError('File size should be less than 5MB');
                     setUploading(false);
                return;
              }
            }
           
             
           
           try{
              const uploadedUrls = [];
              for (const file of files) {
                     const formData = new FormData();
                     formData.append("file", file);
                     formData.append("upload_preset", "profile_perset");
                     const res = await fetch(
                            "https://api.cloudinary.com/v1_1/de91zvrzu/image/upload",
                            {
                                    method: "POST", 
                                    body: formData 
                            }
                     );
                     if (!res.ok) throw new Error('Image upload failed');
                     const imageUrls = await res.json();
                     uploadedUrls.push(imageUrls.secure_url);
              }
              setFormData({
                     ...forData,
                     imageUrl: [...(forData.imageUrl || []), ...uploadedUrls]

              });
              // console.log(uploadedUrls);
              // console.log(forData);
              setFile([]);
              setImageUPloadError(false);
              setUploading(false);
           }catch(err){
              setImageUPloadError('image upload fail ')
              setUploading(false);
           }
       }
       React.useEffect(() => {
              console.log('Updated imageUrl:', forData);
            }, [forData.imageUrl]);

       const handleRemovalImage = (index) =>{
                     setFormData({
                            ...forData,
                            imageUrl: forData.imageUrl.filter((_, i) => i !== index)
                     });
       };
  return (
     <main className='p-4 max-w-5xl mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-9'>Create Listing</h1>
      <form className='flex flex-col sm:flex-row gap-8' >
          <div className='flex flex-col gap-4 flex-1'>
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

            <div className='flex gap-7 flex-wrap'>
                 <div className='flex gap-2'>
                      <input type="checkbox"
                              id='sell'
                              className='w-10' />
                     <span className='font-semibold'>Sell</span>
                 </div>
                 <div className='flex gap-2'>
                      <input type="checkbox"
                              id='rent'
                              className='w-10' />
                     <span className='font-semibold'>Rent</span>
                 </div>
                 <div className='flex gap-2'>
                      <input type="checkbox"
                              id='parking'
                              className='w-10' />
                     <span className='font-semibold'>Parking Spot</span>
                 </div>
                 <div className='flex gap-2'>
                      <input type="checkbox"
                              id='furnished'
                              className='w-10' />
                     <span className='font-semibold'>Furnished</span>
                 </div>
                 <div className='flex gap-2'>
                      <input type="checkbox"
                              id='offer'
                              className='w-10' />
                     <span className='font-semibold'>Offer</span>
                 </div>
            </div>
          <div className=' flex flex-wrap gap-7'>
               <div className=' flex items-center gap-2'>
                     <input type="number"
                            id='bedrooms'
                            min={1}
                            required 
                            className='p-4 border-gray-300 rounded-lg bg-white focus:outline-blue-300 w-23'/>
                     <p className='font-semibold '>Beds</p>
               </div>
               <div className=' flex items-center gap-2'>
                     <input type="number"
                            id='bathrooms'
                            min={1}
                            required 
                            className='p-4 border-gray-300 rounded-lg bg-white focus:outline-blue-300 w-23'/>
                     <p className='font-semibold '>Baths</p>
               </div>
               <div className=' flex items-center gap-2'>
                     <input type="number"
                            id='regularPrice'
                            min={1}
                            required 
                            className='p-4 border-gray-300 rounded-lg bg-white focus:outline-blue-300 w-23'/>
                     <div className='flex flex-col items-center'>
                     <p className='font-semibold '>Regular Price</p>
                     <span className='text-xs'>($ / Month)</span>
                     </div>
                    
               </div>
               <div className=' flex items-center gap-2'>
                     <input type="number"
                            id='discountedPrice'
                            min={1}
                            required 
                            className='p-4 border-gray-300 rounded-lg bg-white focus:outline-blue-300 w-23'/>
                     <div className=' flex flex-col items-center'>
                     <p className='font-semibold '>Discounted Price</p>
                     <span className='text-xs'>($ / Month)</span>

                     </div>
               </div>
          </div>

          </div>
          <div className='flex flex-col flex-1 gap-4'>
              <p className='font-semibold'>Image:
                     <span className='font-normal text-gray-600  ml-2'>the first image will be the cover (max-7)</span>
              </p>

              <div className='flex gap-5'>
                     <input type="file"
                            id='images'
                            accept='image/*' 
                            multiple
                            className='p-5 bg-white border-gray-300 rounded-lg w-full'
                            onChange={(e) => setFile(Array.from(e.target.files))}
                            disabled={uploading} />
              <button className='py-3 px-6 text-green-700 border-green-700  rounded-lg uppercase  hover:shadow-2xl  disabled:opacity-80 bg-white'
               type='button'
               disabled={uploading}
               onClick={handleImageSubmit}>{ uploading? 'uploading...' : 'Uploading'}</button>
              </div>
              <p className='text-red-700 text-xlsm'>{imageUploadError && imageUploadError }</p>

              {
                     forData.imageUrl.length > 0  &&  forData.imageUrl.map((url, index) => (
                            
                            <div className=' flex justify-between  rounded-lg border-0 items-center  p-3 bg-gray-200' key={index}>
                                    <img src={url}
                                          alt='Listing Image'
                                          className='w-22 h-22 object-contain rounded-lg ' />
                                  <button  className='text-red-700 rounded-lg hover:opacity-80  hover:bg-slate-300 p-3'
                                   type='button'
                                  onClick={() => handleRemovalImage(index)}>Delete</button>
                            </div>
                      
                     ))
              }

          <button className='p-4 mt-5 bg-slate-700 text-white rounded-lg  uppercase hover:opacity-95 disabled:-75 '>Create List </button>

          </div>
      </form>
     </main>
  )
}
