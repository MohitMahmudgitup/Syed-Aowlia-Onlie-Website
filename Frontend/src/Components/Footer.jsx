import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import PaymentMethods from "./PaymentMethods";

const Footer = () => {
  const { darkmode } = useContext(ShopContext);

  return (
    <>
      <div className={`py-12 bg-[#B8D9DC] mt-10 text-white relative overflow-hidden`}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Logo and Description */}
            <div className="lg:col-span-2 space-y-6">
              <NavLink to={"/"} className="inline-block group">
                <img 
                  width={200} 
                  src={assets.syedAowlia} 
                  alt="Online Shop BD" 
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </NavLink>
              <div className="space-y-4">
                <p className="text-white/90 leading-relaxed text-base max-w-md">
                  Whether you need help expanding the team, ramping up marketing, or
                  keeping surprise bestsellers in stock, Shopify Capital is here to
                  lend a hand.
                </p>
                <div className="flex space-x-4">
                  {/* Social media icons placeholder */}
                  <div className="flex space-x-3">
                    <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 group">
                      <span className="text-lg group-hover:scale-110 transition-transform">📘</span>
                    </button>
                    <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 group">
                      <span className="text-lg group-hover:scale-110 transition-transform">📷</span>
                    </button>
                    <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300 group">
                      <span className="text-lg group-hover:scale-110 transition-transform">🐦</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white mb-4 relative">
                  Quick Links
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white rounded-full"></span>
                </h3>
              </div>
              <nav>
                <ul className="space-y-3">
                  {["Home", "About", "Collection", "Contact"].map((item, index) => (
                    <li key={index}>
                      <button
                        className={`group flex items-center space-x-2 transition-all duration-300 text-white/80 hover:text-white hover:translate-x-1 ${
                          darkmode
                            ? "hover:text-violet-300"
                            : "hover:text-white"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></span>
                        <span className="font-medium">{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white mb-4 relative">
                  Get in Touch
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white rounded-full"></span>
                </h3>
              </div>
              <div className="space-y-4">
                <div className="group">
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📞</span>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide font-semibold">Phone</p>
                      <p className="text-white font-medium">+88-0183-597-2300</p>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">✉️</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white/60 text-xs uppercase tracking-wide font-semibold">Email</p>
                      <p className="text-white font-medium text-sm break-all">syedaowliaonlineshop@gmail.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-white/60 text-xs uppercase tracking-wide font-semibold mb-3">Payment Methods</p>
                  <div className="bg-white/5 rounded-lg p-3">
                    <PaymentMethods/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-white/80 text-sm">
                  © 2025 <span className="font-semibold text-white">Mohit Mahmud</span>. All rights reserved.
                </p>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <button className="text-white/60 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </button>
                <span className="text-white/40">•</span>
                <button className="text-white/60 hover:text-white transition-colors duration-300">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;