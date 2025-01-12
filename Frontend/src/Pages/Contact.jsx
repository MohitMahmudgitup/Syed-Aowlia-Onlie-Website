import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import Titel from "../Components/titel";

const Contact = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto p-6 bg-white ">
        <div className="text-center">
          <Titel text1={"Contact  Us"} text2={" Get in touch with us"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Store Information Card */}
          <div className=" bg-gray-50 p-8 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              Our Store
            </h2>
            <div className="flex items-center mb-4">
              <MdLocationOn className="text-blue-600 mr-3 text-2xl" />
              <p className="text-gray-700">
                54709 Willms Station, Suite 350, Washington, USA
              </p>
            </div>
            <div className="flex items-center mb-4">
              <FaPhone className="text-blue-600 mr-3 text-2xl" />
              <a
                href="tel:(415)555-0132"
                className="text-gray-700 hover:underline"
              >
                (415) 555-0132
              </a>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-blue-600 mr-3 text-2xl" />
              <a
                href="mailto:admin@forever.com"
                className="text-gray-700 hover:underline"
              >
                admin@forever.com
              </a>
            </div>
          </div>

          {/* Careers Information Card */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              Careers at Forever
            </h2>
            <p className="text-gray-700 mb-4">
              Explore our teams and job openings to start your career journey
              with us.
            </p>
          </div>
        </div>

        {/* Additional Section for Feedback or Questions */}
        <div className="mt-8">
          <div className="text-center">
            <Titel text1={"Have"} text2={" Questions"} />
          </div>

          <p className="text-gray-700 mb-4 text-center">
            Feel free to reach out to us anytime, we’re here to help!
          </p>
          <form className="bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 rounded p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Your Message"
              className="border border-gray-300 rounded p-3 mb-4 w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
