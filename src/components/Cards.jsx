import React from "react";
import { Link } from "react-router-dom";
import noImage from "/noImage.webp";

const Cards = ({ trending, title }) => {
  return (
    <div
      className="
        grid p-4 md:p-10 
        grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        xl:grid-cols-5 gap-x-6 gap-y-10
      "
    >
      {trending?.map((trend, index) => (
        <Link
          to={`/${trend.media_type || title}/details/${trend.id}`}
          key={index}
          className="relative w-full h-[330px] bg-slate-200 p-1.5 block overflow-hidden"
        >
          <img
            className="w-full h-[90%] object-cover"
            src={
              trend.poster_path || trend.backdrop_path || trend.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    trend.poster_path ||
                    trend.backdrop_path ||
                    trend.profile_path
                  }`
                : noImage
            }
            alt=""
          />

          <h1 className="text-lg text-gray-800 font-bold line-clamp-1 mt-1">
            {trend?.name ||
              trend?.title ||
              trend?.original_name ||
              trend?.original_title}
          </h1>

          {trend?.vote_average && (
            <div className="absolute right-3 top-3 flex w-10 h-10 rounded-full justify-center items-center font-bold bg-yellow-500 text-black shadow-lg">
              {(trend.vote_average * 10).toFixed()}
              <sup className="text-xs">%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
