import React from 'react';

function NewsLetterBox() {
  const onClickSubmit = (event) => {
    event.preventDefault();
    console.log("Submit button clicked");
  };

  return (
    <div className=" py-8 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="font-bold text-3xl text-gray-800 mb-3">Subscribe Now & Get 25% Off</h1>
        <p className="text-gray-600 mb-6">Join our newsletter and stay updated on the latest offers and products.</p>
        <form onSubmit={onClickSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition duration-200"
            placeholder="Enter your email"
            required
          />
          <button className="bg-black text-white px-6 py-3 rounded-lg text-sm transition duration-200 hover:bg-gray-800 focus:outline-none">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsLetterBox;
