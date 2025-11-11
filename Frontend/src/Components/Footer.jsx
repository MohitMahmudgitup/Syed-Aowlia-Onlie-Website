import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import PaymentMethods from "./PaymentMethods";
import { toast } from "react-toastify";

const Footer = () => {
  const { darkmode } = useContext(ShopContext);
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/footer");
        const json = await res.json();
        if (json.success) {
          setFooterData(json.data[0]);
        }
      } catch (error) {
        // toast.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) {
    return <div className="py-12 text-center text-white">Loading footer...</div>;
  }

  const { logo, description, socialLinks, phone, email, paymentMethods, quickLinks } = footerData;

  return (
    <div className={`py-12 bg-[#B8D9DC] mt-10 text-white relative overflow-hidden`}>
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6">
            <NavLink to={"/"} className="inline-block group">
              <img
                width={200}
                src={`http://localhost:4000/uploads/footer/${logo}`}
                alt="Company Logo"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </NavLink>
            <p className="text-white/90 leading-relaxed text-base max-w-md">{description}</p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300">📘</a>}
              {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300">📷</a>}
              {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300">🐦</a>}
              {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300">💼</a>}
              {socialLinks.youtube && <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300">▶️</a>}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 relative">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white rounded-full"></span>
            </h3>
            <nav>
              <ul className="space-y-3">
                {(quickLinks.length ? quickLinks : ["Home", "About", "Collection", "Contact"]).map((item, index) => (
                  <li key={index}>
                    <button className={`group flex items-center space-x-2 transition-all duration-300 text-white/80 hover:text-white hover:translate-x-1 ${darkmode ? "hover:text-violet-300" : "hover:text-white"}`}>
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full group-hover:bg-white transition-colors"></span>
                      <span className="font-medium">{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 relative">
              Get in Touch
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white rounded-full"></span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">📞</div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wide font-semibold">Phone</p>
                  <p className="text-white font-medium">{phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">✉️</div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/60 text-xs uppercase tracking-wide font-semibold">Email</p>
                  <p className="text-white font-medium text-sm break-all">{email}</p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-2">
                <p className="text-white/60 text-xs uppercase tracking-wide font-semibold mb-3">Payment Methods</p>
                <div className="bg-white/5 rounded-lg p-3 flex space-x-2">
                  {paymentMethods.map((pm, index) => (
                    <img key={index} src={`http://localhost:4000/uploads/footer/${pm}`} alt="Payment Method" className="w-12 h-8 object-contain"/>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-white/80 text-sm text-center sm:text-left">
            © 2025 <span className="font-semibold text-white">Mohit Mahmud</span>. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <button className="text-white/60 hover:text-white transition-colors duration-300">Privacy Policy</button>
            <span className="text-white/40">•</span>
            <button className="text-white/60 hover:text-white transition-colors duration-300">Terms of Service</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
