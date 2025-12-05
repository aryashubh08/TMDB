import React from "react";
import { Link } from "react-router-dom";
import { GiAcousticMegaphone } from "react-icons/gi";
import { MdMovieCreation } from "react-icons/md";

const Header = ({ data }) => {
  const imgUrl = data?.backdrop_path || data?.profile_path;

  return (
    <div
      className="
        w-full
        min-h-[80vh]     
        lg:min-h-[60vh] 
        xl:min-h-[70vh]  
        flex flex-col justify-end items-start p-[5%]
        overflow-hidden   
      "
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)),
          url(https://image.tmdb.org/t/p/original/${imgUrl})
        `,
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-5xl w-[70%] font-black">
        {data?.name ||
          data?.title ||
          data?.original_name ||
          data?.original_title}
      </h1>
      <p className="sm-w-[60%] lg:w-[60%] xl:w-[60%]  mt-3 mb-3">
        {data?.overview?.slice(0, 200)}...
        <Link
          to={`/${data?.media_type}/details/${data?.id}`}
          className="text-blue-400"
        >
          more
        </Link>
      </p>
      <p className="flex  items-center justify-start">
        <GiAcousticMegaphone className="text-yellow-500 mr-1 " />
        {data?.release_date}
        <MdMovieCreation className="text-yellow-500 mr-1 " />
        {data?.media_type?.toUpperCase()}
      </p>
      <Link
        to={`/${data?.media_type}/details/${data?.id}/trailer`}
        className="p-2 bg-[#FFA100] rounded mt-5"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
