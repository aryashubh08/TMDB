import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Dropdown from "../components/Dropdown";
import Cards from "../components/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../components/Loading";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [category, setCategory] = useState("movie");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.results]); // Append new results
        setPage((prev) => prev + 1); // Increment page safely
      } else {
        setHasMore(false); // Stop fetching if no more data
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setPage(1);
      setPopular([]);
      setHasMore(true);
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  useEffect(() => {
    getPopular();
  }, [page, category]); // Fetch whenever page changes

  return popular.length > 0 ? (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* HEADER */}
      <div className="w-full p-2 sm:px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-max">
          <GoArrowLeft
            className="cursor-pointer text-2xl"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-semibold">Popular</h1>
        </div>

        <div className="flex items-center gap-3 min-w-max">
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            category={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {/* CARDS */}
        <Cards trending={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
