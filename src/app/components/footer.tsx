"use client";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaTelegram,
  FaArrowUp,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    const target = document.getElementById("top");
    if (target) {
      target.scrollIntoView({
        behavior: "smooth", // Smooth scroll
        block: "start", // Align to the start of the target element
      });
    }
  };

  // Function to handle scroll event and toggle button visibility
  const handleScroll = () => {
    if (window.scrollY > 200) {
      // If scrolled more than 200px, show button
      setIsVisible(true);
    } else {
      setIsVisible(false); // If scrolled back to top, hide button
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="footer-top-wrap bg-gray-900 py-8 text-white">
      <div className="footer-scroll-wrap fixed bottom-6 right-6 z-50">
        <button
          onClick={handleScrollToTop}
          className="scroll-to-target bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
          data-target="html"
        >
          <FaArrowUp size={30} />
        </button>
      </div>
      <div className=" mx-auto px-6">
        <div className="flex flex-wrap    px-6">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-sm text-[#FFFFFF]">
              Copyright © 2023 Bigtech All Rights Reserved.
            </p>
          </div>
          <div className="w-full lg:w-1/2 hidden lg:block">
            <div className="footer-menu text-center lg:text-right">
              <ul className="flex justify-center lg:justify-end space-x-4">
                <li>
                  <a
                    href="#"
                    className="relative text-sm text-[#A4B4C3] hover:text-white underline-animate py-1"
                  >
                    Terms and conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="relative text-sm text-[#A4B4C3] hover:text-white underline-animate py-1"
                  >
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
