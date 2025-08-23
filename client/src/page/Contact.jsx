import React,{useState} from "react";
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaLinkedin, 
  FaTelegram 
} from "react-icons/fa";

export default function Contact() {
  const [dataForm, setDataForm] = useState({});

  const handleChange = (e) =>{
    setDataForm({
      ...dataForm,
      [e.target.id] : e.target.value
    })
  }
  console.log(dataForm);
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          We'd love to hear from you! Reach out to us via phone, email, or visit our office. 
          You can also connect with us through social media.
        </p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {/* Phone */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition">
          <FaPhoneAlt className="text-blue-700 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Phone</h2>
          <p className="text-gray-600">+251 962 945 025</p>
          <p className="text-gray-600">+251 976 211 773</p>
        </div>

        {/* Email */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition">
          <FaEnvelope className="text-blue-700 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Email</h2>
          <p className="text-gray-600">abushe339@gmail.com</p>
          <p className="text-gray-600">Amir@abusheRealState.com</p>
        </div>

        {/* Address */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition">
          <FaMapMarkerAlt className="text-blue-700 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Address</h2>
          <p className="text-gray-600 text-center">
            Arba Minch University, Ethiopia
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-3xl mt-16 bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center">Send Us a Message</h2>
        <form className="grid grid-cols-1 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id='name'
              onChange={handleChange}
               
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id='email'
              onChange={handleChange}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id='textarea'
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Social Media */}
      <div className="flex gap-6 mt-12">
        {/* Facebook */}
        <a 
          href="https://web.facebook.com/?_rdc=1&_rdr#" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-700 text-3xl hover:scale-110 transition"
        >
          <FaFacebook />
        </a>

        {/* LinkedIn */}
        <a 
          href="https://www.linkedin.com/feed/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 text-3xl hover:scale-110 transition"
        >
          <FaLinkedin />
        </a>

        {/* Telegram */}
        <a 
          href="https://t.me/abushe136" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sky-500 text-3xl hover:scale-110 transition"
        >
          <FaTelegram />
        </a>
      </div>
    </div>
  );
}
