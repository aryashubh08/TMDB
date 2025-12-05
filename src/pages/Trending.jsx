import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Dropdown from "../components/Dropdown";
import Cards from "../components/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../components/Loading";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]); // Append new results
        setPage((prev) => prev + 1); // Increment page safely
      } else {
        setHasMore(false); // Stop fetching if no more data
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const refreshHandler = () => {
    setPage(1);
    setTrending([]);
    setHasMore(true);
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  useEffect(() => {
    getTrending();
  }, [page, category, duration]); // Fetch whenever page changes

  return trending.length > 0 ? (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* HEADER */}
      <div className="w-full p-2 sm:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-max">
          <GoArrowLeft
            className="cursor-pointer text-2xl"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-semibold">Trending</h1>
        </div>

        <div className="flex items-center gap-3 min-w-max">
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            category={(e) => setCategory(e.target.value)}
          />
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            category={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {/* CARDS */}
        <Cards trending={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
