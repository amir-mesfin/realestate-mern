import React, { useState } from "react";
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaLinkedin, 
  FaTelegram 
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const res = await fetch('/api/contact/contactInformation',{
         method:'POST',
         headers:{
          'Content-Type': 'application/json'
         },
         body:JSON.stringify(formData)
      });
      const data = await res.json();
      setErrors({});
      console.log("Form submitted successfully:", formData);
      alert(data.message);

      setFormData({ name: "", email: "", message: "" });
    }
  };

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
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition">
          <FaPhoneAlt className="text-blue-700 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Phone</h2>
          <p className="text-gray-600">+251 962 945 025</p>
          <p className="text-gray-600">+251 976 211 773</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition">
          <FaEnvelope className="text-blue-700 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Email</h2>
          <p className="text-gray-600">abushe339@gmail.com</p>
          <p className="text-gray-600">Amir@abusheRealState.com</p>
        </div>

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
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`w-full p-3 border rounded-lg focus:outline-none ${
                errors.name ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full p-3 border rounded-lg focus:outline-none ${
                errors.email ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className={`w-full p-3 border rounded-lg focus:outline-none ${
                errors.message ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
              }`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
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
        <a href="https://web.facebook.com/Abushe.RealEstate" target="_blank" rel="noopener noreferrer" className="text-blue-700 text-3xl hover:scale-110 transition">
          <FaFacebook />
        </a>
        <a href="https://www.linkedin.com/in/abushe-mesfin/" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-3xl hover:scale-110 transition">
          <FaLinkedin />
        </a>
        <a href="https://t.me/abushe136" target="_blank" rel="noopener noreferrer" className="text-sky-500 text-3xl hover:scale-110 transition">
          <FaTelegram />
        </a>
      </div>
    </div>
  );
}
