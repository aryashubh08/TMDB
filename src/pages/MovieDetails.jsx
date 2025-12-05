import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadMovie, removeMovie } from "../store/action/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { IoMdExit } from "react-icons/io";
import { FaFirefoxBrowser } from "react-icons/fa";
import { SiImdb } from "react-icons/si";
import { FaPlay } from "react-icons/fa";
import HorizontalCards from "../components/HorizontalCards";
import Loading from "../components/Loading";

function MovieDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => dispatch(removeMovie());
  }, [id]);

  return info ? (
    <div
      className="w-screen min-h-screen overflow-x-hidden px-[5%] relative"
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.7)),
     url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
    >
      {/* Nav */}
      <nav
        className="w-full mt-4 text-zinc-100 flex gap-6 items-center 
                  text-xl sm:text-2xl"
      >
        <GoArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <a
          href={info?.detail?.homepage}
          className="cursor-pointer"
          target="_blank"
        >
          <IoMdExit />
        </a>
        <a href={`https://www.wikidata.org/wiki/${info.external.wikidata_id}`}>
          <FaFirefoxBrowser />
        </a>
        <a href={`https://www.imdb.com/title/${info.external.imdb_id}`}>
          <SiImdb />
        </a>
      </nav>

      {/* Main Content Wrapper */}
      <div
        className="w-full flex flex-col lg:flex-row items-start 
                  justify-between mt-10 gap-10"
      >
        {/* Poster */}
        <div className="w-full p-1.5 min-sm:bg-slate-200 lg:w-auto flex justify-center">
          <img
            className="h-[50vh] sm:h-[60vh] lg:h-[65vh] object-cover 
                   shadow-[8px_17px_38px_2px_rgba(0,0,0,.6)] "
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-[70%] mt-5 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
            {info?.detail?.title || info?.detail?.name}
            <small className="text-lg sm:text-xl text-zinc-300 font-semibold">
              {" "}
              ({info?.detail?.release_date?.split("-")[0]})
            </small>
          </h1>

          {/* Stats Row */}
          <div className="flex flex-wrap mt-3 mb-3 text-white items-center gap-3 sm:gap-5">
            <span
              className="flex w-[6vh] h-[6vh] rounded-full justify-center 
                         items-center font-semibold bg-yellow-600"
            >
              {(info.detail.vote_average * 10).toFixed()}%
            </span>

            <h1 className="font-semibold">User Score</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>

          {/* Overview */}
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            {info.detail.overview}
          </p>

          {/* Trailer Button */}
          <Link
            className="mt-6 flex items-center gap-3 px-6 py-2 sm:px-7 sm:py-3 
                   rounded-md w-fit bg-[#FFA100] text-sm sm:text-base"
            to={`${pathname}/trailer`}
          >
            <FaPlay /> Play Trailer
          </Link>
        </div>
      </div>

      {/* Providers */}
      <div className="w-full lg:w-[80%] mt-10 flex flex-col gap-6">
        {/* Flat Rate */}
        {info?.watchProvider?.flatrate && (
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <h1 className="font-semibold w-[40%] sm:w-[20%]">Available on</h1>
            <div className="flex gap-3 flex-wrap">
              {info.watchProvider.flatrate.map((r) => (
                <img
                  className="w-[40px] sm:w-[50px] rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${r.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}

        {/* Rent */}
        {info?.watchProvider?.rent && (
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <h1 className="font-semibold w-[40%] sm:w-[20%]">Rent</h1>
            <div className="flex gap-3 flex-wrap">
              {info.watchProvider.rent.map((r) => (
                <img
                  className="w-[40px] sm:w-[50px] rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${r.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}

        {/* Buy */}
        {info?.watchProvider?.buy && (
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <h1 className="font-semibold w-[40%] sm:w-[20%]">Buy</h1>
            <div className="flex gap-3 flex-wrap">
              {info.watchProvider.buy.map((r) => (
                <img
                  className="w-[40px] sm:w-[50px] rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${r.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <h1 className="mt-10 text-lg sm:text-xl font-semibold">
        Recommendations & Similar Stuff
      </h1>

      <HorizontalCards
        data={info.recommendations ? info.recommendations : info.similar}
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default MovieDetails;
