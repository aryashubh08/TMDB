import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Popular from "./pages/Popular";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import People from "./pages/People";
import PeopleDetails from "./pages/PeopleDetails";
import NotFound from "./pages/NotFound";
import TvShows from "./pages/TvShows";

import TvDetails from "./pages/TvDetails";
import Trailer from "./pages/Trailer";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden flex ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tvShows" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          {" "}
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/people" element={<People />} />
        <Route path="/people/details/:id" element={<PeopleDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
