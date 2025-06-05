import React from 'react';
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaXTwitter,
} from 'react-icons/fa6';
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white pt-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-sm">
        {/* ABOUT */}
        <div>
          <h4 className="text-gray-400 font-bold mb-2">ABOUT</h4>
          <ul className="space-y-1 text-gray-300">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Flipkart Stories</li>
            <li>Press</li>
            <li>Corporate Information</li>
          </ul>
        </div>

        {/* GROUP COMPANIES */}
        <div>
          <h4 className="text-gray-400 font-bold mb-2">GROUP COMPANIES</h4>
          <ul className="space-y-1 text-gray-300">
            <li>Myntra</li>
            <li>Cleartrip</li>
            <li>Shopsy</li>
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h4 className="text-gray-400 font-bold mb-2">HELP</h4>
          <ul className="space-y-1 text-gray-300">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* CONSUMER POLICY */}
        <div>
          <h4 className="text-gray-400 font-bold mb-2">CONSUMER POLICY</h4>
          <ul className="space-y-1 text-gray-300">
            <li>Cancellation & Returns</li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
            <li>Grievance Redressal</li>
            <li>EPR Compliance</li>
          </ul>
        </div>

        {/* MAIL US */}
        <div>
          <h4 className="text-gray-400 font-bold mb-2">Mail Us:</h4>
          <p className="text-gray-300 text-sm">
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </p>
          <div className="mt-3 text-gray-400">
            Social:
            <div className="flex space-x-3 mt-1 text-white text-lg">
              <FaFacebookF />
              <FaXTwitter />
              <FaYoutube />
              <FaInstagram />
            </div>
          </div>
        </div>

        {/* REGISTERED ADDRESS */}
        <div>
          <h4 className="text-gray-400 font-bold mb-2">Registered Office Address:</h4>
          <p className="text-gray-300 text-sm">
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India<br />
            CIN: U51109KA2012PTC066107<br />
            Telephone: <span className="text-blue-400">044-45614700</span>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 py-4 px-4 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-6 justify-center md:justify-start text-yellow-400 text-sm">
          <span className="flex items-center gap-2">🛍 Become a Seller</span>
          <span className="flex items-center gap-2">📢 Advertise</span>
          <span className="flex items-center gap-2">🎁 Gift Cards</span>
          <span className="flex items-center gap-2">❓ Help Center</span>
        </div>
        <div className="flex items-center gap-1 mt-3 md:mt-0">
          <FaRegCopyright className="text-gray-400" />
          <p>2007-2025 Flipkart.com</p>
        </div>
        <div className="flex gap-2 mt-3 md:mt-0">
          <img src="https://img.icons8.com/color/36/visa.png" alt="visa" />
          <img src="https://img.icons8.com/color/36/mastercard-logo.png" alt="mastercard" />
          <img src="https://img.icons8.com/color/36/rupay.png" alt="rupay" />
          <img src="https://img.icons8.com/color/36/discover.png" alt="discover" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
