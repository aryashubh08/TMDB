import React from "react";
import { Link } from "react-router-dom";
import { FaFire } from "react-icons/fa";
import { PiShootingStarFill } from "react-icons/pi";
import { RiMovie2AiLine } from "react-icons/ri";
import { IoTvSharp } from "react-icons/io5";
import { FaUserSecret } from "react-icons/fa";
import { FaPhoneSquare } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const SideNav = () => {
  return (
    <div className="fixed top-0 left-0 w-[18%] lg:w-[20%] xl:w-[20%] bg-[#0f0f0f] border-r border-zinc-800 p-4 h-screen text-white">
      {/* Logo */}
      <img
        src="/logo.png"
        alt="logo"
        className="hidden invert sm:block h-12 mx-auto opacity-90 hover:opacity-100 transition"
      />

      {/* Menu 1 */}
      <nav className="flex flex-col mt-10 gap-1.5 text-lg">
        <h1 className="hidden sm:block font-semibold text-[1.2rem] text-zinc-300 mb-2">
          New Feeds
        </h1>

        <Link
          to="/trending"
          className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-700 transition text-zinc-200"
        >
          <h2 className="hidden sm:block">Trending</h2>
          <FaFire className="text-orange-400 text-2xl" />
        </Link>

        <Link
          to="/popular"
          className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-700 transition text-zinc-200"
        >
          <h2 className="hidden sm:block">Popular</h2>
          <PiShootingStarFill className="text-blue-400 text-2xl" />
        </Link>

        <Link
          to="/movie"
          className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-700 transition text-zinc-200"
        >
          <h2 className="hidden sm:block">Movies</h2>
          <RiMovie2AiLine className="text-red-400 text-2xl" />
        </Link>

        <Link
          to="/tvShows"
          className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-700 transition text-zinc-200"
        >
          <h2 className="hidden sm:block">TV Shows</h2>
          <IoTvSharp className="text-purple-400 text-2xl" />
        </Link>

        <Link
          to="/people"
          className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-700 transition text-zinc-200"
        >
          <h2 className="hidden sm:block">People</h2>
          <FaUserSecret className="text-green-400 text-2xl" />
        </Link>
      </nav>

      <hr className="border-zinc-700 my-5" />

      {/* Menu 2 */}
      <h1 className="hidden sm:block font-semibold text-zinc-300">
        Website Information
      </h1>

      <nav className="flex flex-col mt-3 gap-3">
        <Link
          to="/contact"
          className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-700 transition text-zinc-200"
        >
          <h2 className="hidden sm:block">Contact</h2>
          <FaPhoneSquare className="text-teal-400 text-2xl" />
        </Link>

        <Link
          to="/about"
          className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-700 transition text-zinc-200"
        >
          <h2 className="hidden sm:block">About</h2>
          <IoMdInformationCircleOutline className="text-yellow-400 text-2xl" />
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
