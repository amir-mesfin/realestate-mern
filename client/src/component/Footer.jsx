import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo Section (Large) */}
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-3">
            <img
              src="http://res.cloudinary.com/de91zvrzu/image/upload/v1755390858/fmbw5k0za7akjpwavc1k.ico"
              alt="Abushe Real Estate Logo"
              className="w-66 h-20 rounded-lg shadow-lg"
            />
            <h1 className="text-2xl font-bold text-white">
              Abushe Real Estate
            </h1>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Making your dream home a reality. Buy, sell, or rent properties with
            trust and confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
          </ul>
        </div>

        {/* Contact Info with Icons */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact Info</h2>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-white" />
              <span>info@abusheestate.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhone className="text-white" />
              <span>+251 900 123 456</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-white" />
              <span>Arba Minch, Ethiopia</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Abushe Real Estate | Designed by Amir Mesfin
      </div>
    </footer>
  );
};

export default Footer;
