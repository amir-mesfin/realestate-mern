import React, { useEffect, useState } from 'react';
import { FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaComment } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = ({ listing }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ``
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [landLord, setLandLord] = useState(null);
  const [error, setError] = useState(null);
  useEffect( ()=>{
  
           const fetchLandLord = async ()=>{
            try{
                 const realStateLord = await fetch(`/api/user/${listing.userRef}`);
                 const data = await realStateLord.json();
                if(data.success === false){
                  setError(data.message);
                  return;
                }
                 console.log(data);
                setLandLord(data);
            }catch(err){
                 setError(err);
            }
           }
           fetchLandLord();
  },[listing.userRef])
  // React.useEffect(()=>{
  //   console.log(landLord);
  // })
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Build payload to send
    const payload = {
      ...formData,          
      to: landLord?.email,  // landlord’s email
      property: listing?.name, 
      address: listing?.address,
      phone: listing?.phone,
    };
  
    try {
      const res = await fetch("/api/contact/send-to-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
  
      if (data.success === false) {
        setError(data.message);
        setIsLoading(false);
        return;
      }
  
      // success
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: `Hi, I'm interested in ${listing?.name} at ${listing?.address}. Could you tell me more about it?`
      });
  
    } catch (err) {
      setError("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };
  
  console.log(formData);

  return (
    <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-100 shadow-lg">
      <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
        <FaComment className="text-blue-500" />
        Contact Owner
      </h3>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaPhone className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-blue-800">{listing.phone}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100 flex items-center gap-3">
          <div className="bg-purple-100 p-3 rounded-full">
            <FaEnvelope className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-purple-800">{landLord?.email}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100 flex items-center gap-3">
          <div className="bg-teal-100 p-3 rounded-full">
            <FaMapMarkerAlt className="text-teal-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium text-teal-800">{listing.address}</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      {isSubmitted ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-200 text-green-800 p-4 rounded-lg text-center"
        >
          <p className="font-medium">Thank you for your message!</p>
          <p>We'll get back to you within 24 hours.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-4 border"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-4 border"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-4 border"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium text-white ${
              isLoading ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            } shadow-md transition-all duration-200`}
          >
            {isLoading ? (
              'Sending...'
            ) : (
              <>
                <FaPaperPlane />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      )}

      {/* Schedule Viewing */}
      <div className="mt-6 bg-gradient-to-r from-teal-500 to-emerald-600 p-4 rounded-lg text-white">
        <h4 className="font-bold text-lg mb-2">Schedule a Viewing</h4>
        <p className="mb-3">Want to see this property in person?</p>
        <button className="bg-white text-teal-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Book an Appointment
        </button>
      </div>
    </div>
  );
};

export default Contact;