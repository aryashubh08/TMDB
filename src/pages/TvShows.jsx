import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Dropdown from "../components/Dropdown";
import Cards from "../components/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../components/Loading";

const Movies = () => {
  const [tv, setTv] = useState([]);
  const [category, setCategory] = useState("airing_today");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const getTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTv((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const refreshHandler = async () => {
    if (tv.length === 0) {
      getTv();
    } else {
      setPage(1);
      setTv([]);
      // getTv();
    }
  };

  useEffect(() => {
    // getTv();
    refreshHandler();
  }, [category]);

  useEffect(() => {
    getTv();
  }, [page, category]);

  return tv.length > 0 ? (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* HEADER */}
      <div className="w-full p-2 sm:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-max">
          <GoArrowLeft
            className="cursor-pointer text-2xl"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-semibold">
            Tv Shows (<small>{category}</small>)
          </h1>
        </div>

        <div className="flex items-center gap-3 min-w-max">
          <Dropdown
            title="Category"
            options={["on_the_air", "top_rated", "popular", "airing_today"]}
            category={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* INFINITE SCROLL */}
      <InfiniteScroll
        dataLength={tv.length}
        next={getTv}
        hasMore={hasMore}
        loader={<h4 className="text-center py-4">Loading...</h4>}
      >
        <Cards trending={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
