import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import Header from "../components/Header";
import axios from "../utils/axios";
import Dropdown from "../components/Dropdown";
import HorizontalCards from "../components/HorizontalCards";

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [category, setCategory] = useState("all");
  const [trending, setTrending] = useState(null);
  console.log(trending);

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/week`);
      // console.log(data);
      const randomWallpaper =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomWallpaper);
    } catch (error) {
      console.log("error", error);
    }
  };

  //we need to find out trending data according to category
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      // console.log(data);
      setTrending(data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log(category);

  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);

  return (
    <>
      <SideNav />

      <div className="ml-[18%] lg:ml-[20%] xl:ml-[20%] w-full min-h-screen overflow-x-hidden">
        <TopNav />
        <Header data={wallpaper} />

        <div className="p-4">
          <div className="p-5 flex justify-between items-center">
            <h1>Trending</h1>
            <Dropdown
              title="filter"
              options={["tv", "movie", "all"]}
              category={(e) => setCategory(e.target.value)}
            />
          </div>

          <HorizontalCards data={trending} />
        </div>
      </div>
    </>
  );
};

export default Home;
