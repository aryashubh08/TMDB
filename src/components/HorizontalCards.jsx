import React from "react";
import { Link } from "react-router-dom";
import noImage from "/noImage.webp";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full h-[55vh] max-sm:h-[35vh] p-4 flex overflow-y-hidden overflow-x-auto mb-5">
      {data?.length > 0 ? (
        data.map((card, index) => (
          <Link
            to={`/${card.media_type}/details/${card.id}`}
            className="
              min-w-[55%]     /* mobile full width */
              sm:min-w-[20%]   /* laptop/tablet same as before */
              h-full p-2 mr-5 bg-slate-200
            "
            key={index}
          >
            <img
              className="w-full h-[80%] object-cover"
              src={
                card?.backdrop_path || card?.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      card?.backdrop_path || card?.poster_path
                    }`
                  : noImage
              }
              alt=""
            />
            <div className=" h-[20%] overflow-hidden">
              <h1 className="text-md text-gray-800 whitespace-nowrap font-bold">
                {card?.name ||
                  card?.title ||
                  card?.original_name ||
                  card?.original_title}
              </h1>
              <p className="w-[80%] text-gray-600 text-xs">
                {card?.overview?.slice(0, 18)}..
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>No Data Available</p>
      )}
    </div>
  );
};

export default HorizontalCards;
