import React from 'react';
import Titel from '../Components/titel';
import NewsLetterBox from '../Components/NewsLetterBox';
import { FaRocket, FaShoppingCart, FaUsers } from 'react-icons/fa'; // Importing icons for visual appeal

const About = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <Titel text1={"About"} text2={" Forever"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Icon Cards */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaRocket className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600 text-center">
              We are driven by a passion for innovation, constantly improving our platform.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaShoppingCart className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-600 text-center">
              A wide range of high-quality products tailored to your needs.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaUsers className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
            <p className="text-gray-600 text-center">
              Our mission is to empower customers with choice and confidence.
            </p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <p className="text-lg text-gray-700">
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>
          <p className="text-lg text-gray-700">
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
          </p>
        </div>

        <div className="text-center mt-8 mb-6">
          <Titel text1={"Our"} text2={" Mission"} />
        </div>

        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 font-semibold">
            Join us on this journey of exploration and discovery!
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
