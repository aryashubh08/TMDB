import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import noImage from "/noImage.webp";
import { IoIosSearch } from "react-icons/io";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      if (query.trim().length === 0) return setSearches([]);

      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className=" fixed bg-[#0f0f0f] w-[100%] flex items-center h-[10vh] px-3 mx-auto">
      {/* SEARCH WRAPPER */}
      <div className="relative w-8/10 sm:w-[40%] md:w-[40%] lg:w-[40%] ">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search movies, shows, people..."
          className="w-full p-2 pl-10 text-base sm:text-lg rounded 
                     bg-zinc-800 border border-gray-800 
                     text-white placeholder-gray-400 
                     
                      transition-all"
        />

        {/* SEARCH ICON */}
        <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />

        {/* CLEAR BUTTON */}
        {query.length > 0 && (
          <IoCloseOutline
            onClick={() => {
              setQuery("");
              setSearches([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 
                       text-gray-400 hover:text-red-500 
                       text-2xl cursor-pointer transition"
          />
        )}
      </div>

      {/* SEARCH RESULT DROPDOWN */}
      {searches.length > 0 && (
        <div
          className="
          lg:left-[0%]
            absolute top-[100%] 
            left-0 sm:left-[20.5%]  
            mt-3 
            w-[75%] ml-2
            sm:w-[50%] md:w-[50%] lg:w-[40%] 
            bg-gray-900 border border-gray-700 
            rounded shadow-xl overflow-auto 
            max-h-[55vh] z-50
          "
        >
          {searches.map((item, index) => (
            <Link
              key={index}
              to={`${item.media_type}/details/${item.id}`}
              className="flex items-center gap-8 p-1.5 border-b border-gray-700 hover:bg-gray-800 transition"
            >
              <img
                className="w-[60px] h-[60px] object-cover rounded-lg"
                src={
                  item.backdrop_path || item.profile_path
                    ? `https://image.tmdb.org/t/p/w500${
                        item.backdrop_path || item.profile_path
                      }`
                    : noImage
                }
                alt=""
              />

              <div className="text-white text-base">
                {item.original_title ||
                  item.name ||
                  item.original_name ||
                  item.title}
                <p className="text-sm text-gray-400 capitalize">
                  {item.media_type}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopNav;
