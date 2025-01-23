"use client";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaTelegram,
  FaArrowUp,
  FaStar,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
export default function ContactUs() {
  return (
    <section id="contact" className="contact-area py-16 bg-[#030B15]">
      <div className="container mx-auto px-4">
        <div className="row justify-center mb-16 text-center">
          <div className="col-lg-8">
            <div className="section-title mb-6 d-flex">
              <span className="sub-title text-sm font-semibold text-gray-500 uppercase flex items-center justify-center space-x-2">
                <div className="bg-sky-500 rounded-full w-2 h-2"></div>
                <span>Contact</span>
                <div className="bg-sky-500 rounded-full w-2 h-2"></div>
              </span>
              <h2 className="title text-3xl font-bold text-[white] mt-2">
                <span className="text-blue-600">Contact</span> ICO Crypto
              </h2>
            </div>
          </div>
        </div>
        <div className="contact-info-wrap mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            <div className=" bg-[#030B15] p-6 rounded-lg flex flex-col items-center justify-center">
              <div className="icon mb-4  p-1 rounded-50 border border-[#151C26]">
                <span className="icon-background m-1 bg-[#151C26] w-12 h-12 rounded-full flex items-center justify-center text-[#FF9700] border-2 border-[#FF9700] hover:border-[#FF9700] transition-all duration-300 ease-in-out ">
                  <FaStar size={30} />
                </span>
              </div>
              <div className="content">
                <p className="text-white text-xl mb-0 font-medium leading-7">
                  company@gmail.com <br /> infoweb@gmail.com
                </p>
              </div>
            </div>
            <div className=" bg-[#030B15] p-6 rounded-lg flex flex-col items-center justify-center">
              <div className="icon mb-4  p-1 rounded-50 border border-[#151C26]">
                <span className="icon-background m-1 bg-[#151C26] w-12 h-12 rounded-full flex items-center justify-center text-[#00C4F4] border-2 border-[#00C4F4] hover:border-[#00C4F4] transition-all duration-300 ease-in-out ">
                  <FaStar size={30} />
                </span>
              </div>
              <div className="content">
                <p className="text-white text-xl mb-0 font-medium leading-7">
                  +84 0977425031 <br /> +998 765 775 34
                </p>
              </div>
            </div>
            <div className=" bg-[#030B15] p-6 rounded-lg flex flex-col items-center justify-center">
              <div className="icon mb-4  p-1 rounded-50 border border-[#151C26]">
                <span className="icon-background m-1 bg-[#151C26] w-12 h-12 rounded-full flex items-center justify-center text-[#FF4581] border-2 border-[#719ED6] hover:border-[#00C4F4] transition-all duration-300 ease-in-out ">
                  <FaStar size={30} />
                </span>
              </div>
              <div className="content">
                <p className="text-white text-xl mb-0 font-medium leading-7">
                  State/province/area: <br /> Georgia 198
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="contact-form-wrap bg-cover bg-center p-12 rounded-lg"
          style={{
            backgroundImage:
              "url('https://themedox.com/bigtech/wp-content/uploads/2023/03/contact_bg.png')",
          }}
        >
          <div className="wpcf7 js">
            <form
              action="/bigtech/#wpcf7-f155-p57-o1"
              method="post"
              className="wpcf7-form init"
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-6">
                  <div className="form-grp">
                    <input
                      type="text"
                      name="your-name"
                      placeholder="Enter your Name"
                      className="px-4 py-4 rounded-md w-full bg-[#132132] focus:outline-none text-white placeholder-gray-400 border     transition duration-200 ease-in"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="form-grp">
                    <input
                      type="email"
                      name="your-email"
                      placeholder="Enter your email"
                      className="px-4 py-4 rounded-md w-full bg-[#132132] focus:outline-none text-white placeholder-gray-400 border     transition duration-200 ease-in"
                    />
                  </div>
                </div>
              </div>

              <div className="form-grp mb-6">
                <textarea
                  name="your-message"
                  placeholder="Enter your message"
                  className="px-4 py-6 rounded-md w-full bg-[#132132] focus:outline-none text-white placeholder-gray-400 border     transition duration-200 ease-in"
                ></textarea>
              </div>

              <div className="submit-btn text-center">
                <button
                  type="submit"
                  className=" px-6 py-3 text-white bg-[#030B15] rounded-50 border-2 border-[#00C4F4]  hover:text-[#00C4F4] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
