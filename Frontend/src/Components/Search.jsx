import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <div  className="sm:hidden p-2">
            <Link to={"/collection"} className='flex py-1 bg-white rounded-full justify-center shadow-md'>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border-none p-2 "
                />
                <div className='pt-2'>
                    <img
                        src={assets.search_icon}
                        className={`w-6 h-6 cursor-pointer transition-all duration-300 invert}`}
                        alt="Search Icon"
                    />
                </div>
            </Link>

        </div>
    );
};

export default Search;
