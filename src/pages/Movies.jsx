import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Dropdown from "../components/Dropdown";
import Cards from "../components/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const getMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setMovies((prev) => [...prev, ...data.results]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  // Reset movies when category changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  // Fetch movies whenever page or category changes
  useEffect(() => {
    getMovies();
  }, [page, category]);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* HEADER */}
      <div className="w-full p-2 sm:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-max">
          <GoArrowLeft
            className="cursor-pointer text-2xl"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-semibold">
            Movies (<small>{category}</small>)
          </h1>
        </div>

        <div className="flex items-center gap-3 min-w-max">
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            category={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* INFINITE SCROLL */}
      <InfiniteScroll
        dataLength={movies.length}
        next={movies}
        hasMore={hasMore}
        loader={<h4 className="text-center py-4">Loading...</h4>}
      >
        <Cards trending={movies} title="movie" />
      </InfiniteScroll>
    </div>
  );
};

export default Movies;
