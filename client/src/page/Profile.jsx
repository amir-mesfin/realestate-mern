import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {updateUserStart,
        updateSuccess,
        updateFailure,
        deleteUSerFailure,
       deleteUserSuccess,
       deleteUserStart,
       signOutUserStart,
       signOutUserSuccess,
       signOutUSerFailure, } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
// import

export default function Profile() {

  const [profileImage, setProfileImage] = useState("");
  const [formData, setFormData] = useState({});
  const [load, setLoading] = useState(false);
  const [err, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const { currentUser,error,loading, } = useSelector((state) => state.user);
  // console.log(currentUser);
  const dispatch = useDispatch();
  // Handle avatar URL with fallback
  const getAvatarUrl = () => {
    if (!currentUser || !currentUser.avatar) {
      return "https://www.w3schools.com/howto/img_avatar.png"; // fallback
    }
  
    if (currentUser.avatar.includes("googleusercontent")) {
      return currentUser.avatar.includes("=")
        ? currentUser.avatar
        : currentUser.avatar + "=s96-c";
    }
  
    return currentUser.avatar;
  };

  const avatarURL = getAvatarUrl();
  const fileRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('File size should be less than 5MB');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "profile_perset");
      
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/de91zvrzu/image/upload",
        { method: "POST", body: formData }
      );
      
      if (!res.ok) throw new Error('Image upload failed');
      
      const data = await res.json();
      console.log(data)
      setProfileImage(data.secure_url);
      setSuccess('Profile image updated successfully!');
    } catch (err) {
      console.error("Upload error:", err);
      setSuccess(null);
      setError(err.message || 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    
    try {
      // Here you would typically send to your backend
      const updateData = {
        ...formData,
        ...(profileImage && { avatar: profileImage })
      };
      // console.log(updateData);
      
      // console.log("Submitting:", updateData);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      // console.log(res);
      // Simulate API call
       const data =  await res.json();
       if(data.success === false){
        dispatch(updateFailure(data.message));
        setSuccess(null);
       }else{
        // console.log(data)
        dispatch(updateSuccess(data));
        setSuccess('Profile updated successfully!');
       }
       
     
    } catch (err) {
      dispatch(updateFailure(err.message));
      setSuccess(null);
    }
  };

  const handleDeleteAccount = async()=> {
    // console.log("Account deletion requested");
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
         method:'DELETE',
      })
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUSerFailure(data.message));
        return;
      }
     dispatch(deleteUserSuccess(data));
    }catch(err){
     dispatch(deleteUSerFailure(err.message));
    }
  
  }

  const handleSignOut = async()=> {
    // console.log("Sign out requested");
   try{
    dispatch(signOutUserStart());
      const res = await fetch('api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutUSerFailure(data.message));
        return;
      }
  dispatch(signOutUserSuccess(data));
   }catch(err){
    dispatch(signOutUSerFailure(err));
    
   }  }

  return (
    <div className='max-w-lg mx-auto p-4'>
      <h1 className='text-3xl text-center font-semibold my-9'>Profile</h1>
      
      {/* Success/Error Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error|| err}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* Image Upload */}
        <input 
          onChange={handleImageChange}
          accept='image/*' 
          ref={fileRef}
          hidden
          type="file" 
        />
        <div className="flex flex-col items-center">
          <img 
            onClick={() => fileRef.current.click()}
            src={profileImage || avatarURL}
            alt="Profile" 
            className='rounded-full h-32 w-32 object-cover cursor-pointer mt-2'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-avatar.png';
            }}
          />
          <span className="text-sm mt-2 text-gray-600">
            {loading ? 'Uploading...' : 'Click to change photo'}
          </span>
        </div>
        
        {/* Form Fields */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input 
            type="text"
            placeholder='username'
            className='border-0 p-4 w-full focus:outline-blue-300 rounded-lg bg-white'
            id="username"
            defaultValue={currentUser.username}
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input 
            type="email"
            // value={currentUser.email}
            placeholder='email'
            className='border-0 p-4 w-full focus:outline-blue-300 rounded-lg bg-white'
            id="email"
            value={currentUser.email}
            disabled
       //      disabled={currentUser?.email} // Often emails shouldn't be changed
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            New Password (leave blank to keep current)
          </label>
          <input 
            type="password"
            placeholder='password'
            className='border-0 p-4 w-full focus:outline-blue-300 rounded-lg bg-white'
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <button 
          type="submit"
          className='bg-slate-700 p-4 rounded-lg text-white font-semibold text-xl uppercase hover:opacity-95 disabled:opacity-80'
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      
      </form>
      <Link to="/create-listing">
      <button 
          className='bg-green-600 p-4 rounded-lg text-white font-semibold text-xl uppercase hover:opacity-95 disabled:opacity-80 w-120  mt-4'
        >
          create listing
        </button>
      </Link>

      <div className='flex justify-between mt-5'>
        <button 
          className='text-red-700 cursor-pointer hover:underline'
          onClick={() => confirm('Are you sure you want to delete your account?') && handleDeleteAccount()}
        >
          Delete Account
        </button>
        <button 
          className='text-red-700 cursor-pointer hover:underline'
          onClick={() => confirm('Are you sure you want to sign out?') && handleSignOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

// Placeholder functions (implement these as needed)


