import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadPeople, removePeople } from "../store/action/peopleActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "../components/HorizontalCards";
import Dropdown from "../components/Dropdown";
import { GoArrowLeft } from "react-icons/go";
import Loading from "../components/Loading";

const PeopleDetails = () => {
  const [category, setCategory] = useState("movie");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.people);

  useEffect(() => {
    dispatch(asyncLoadPeople(id));
    return () => dispatch(removePeople());
  }, [id]);

  if (!info) return <Loading />;

  return (
    <div className="min-h-screen w-full bg-[#0F0F0F] text-zinc-300 pb-16">
      {/* Header */}
      <header className="w-full px-5 sm:px-12 h-[12vh] flex items-center">
        <GoArrowLeft
          className="cursor-pointer text-xl"
          onClick={() => navigate(-1)}
        />
      </header>

      <div className="w-full flex flex-col lg:flex-row gap-10 px-5 sm:px-12">
        {/* LEFT SIDE – PROFILE CARD */}
        <div className="w-full lg:w-[28%] bg-[#29272f] shadow-md rounded-2xl p-5">
          <img
            className="w-full h-[45vh] object-cover rounded-xl"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />

          {/* Social icons */}
          <div className="flex gap-5 mt-5 text-zinc-400 text-xl">
            <SocialLink
              icon="fi-sr-earth-americas"
              url={`https://www.wikidata.org/wiki/${info.external.wikidata_id}`}
            />
            <SocialLink
              icon="fi-brands-facebook"
              url={`https://www.facebook.com/${info.external.facebook_id}`}
            />
            <SocialLink
              icon="fi-brands-instagram"
              url={`https://www.instagram.com/${info.external.instagram_id}`}
            />
            <SocialLink
              icon="fi-brands-twitter"
              url={`https://www.twitter.com/${info.external.twitter_id}`}
            />
          </div>

          {/* PERSONAL INFO */}
          <div className="mt-6 space-y-4">
            <SectionTitle title="Personal Info" />

            <InfoLine
              title="Known For"
              value={info.detail.known_for_department}
            />
            <InfoLine
              title="Gender"
              value={info.detail.gender === 2 ? "Male" : "Female"}
            />
            <InfoLine title="Birthday" value={info.detail.birthday} />
            <InfoLine
              title="Deathday"
              value={
                info.detail.deathday ? info.detail.deathday : "Still Alive"
              }
            />
            <InfoLine
              title="Place Of Birth"
              value={info.detail.place_of_birth}
            />
            <InfoLine
              title="Also Known As"
              value={info.detail.also_known_as.join(", ")}
            />
          </div>
        </div>

        {/* RIGHT – MAIN CONTENT */}
        <div className="w-full lg:w-[72%]">
          {/* NAME */}
          <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-300">
            {info.detail.name}
          </h1>

          {/* BIOGRAPHY */}
          <SectionTitle title="Biography" />
          <p className="text-zinc-400 text-[15px] leading-relaxed mt-2 max-h-[220px] overflow-y-auto pr-2">
            {info.detail.biography}
          </p>

          {/* KNOWN FOR */}
          <SectionTitle title="Known For" />
          <div className="mt-3">
            <HorizontalCards data={info.combinedCredits.cast} />
          </div>

          {/* ACTING + DROPDOWN */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between">
            <h1 className="text-xl font-medium text-zinc-300">Acting</h1>

            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              category={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* CREDITS LIST PANEL */}
          <ul className="mt-4 bg-[#29272f] border border-zinc-700 rounded-xl shadow p-5 max-h-[50vh] overflow-y-auto">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="p-3 rounded-lg hover:bg-[#3a3744] cursor-pointer transition"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span className="font-medium text-zinc-300">
                    {c.name || c.title}
                  </span>

                  {c.character && (
                    <span className="block text-sm text-zinc-500 mt-1">
                      Character: {c.character}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PeopleDetails;

/* ---------------------- SMALL COMPONENTS ---------------------- */
const SectionTitle = ({ title }) => (
  <h2 className="mt-6 text-[17px] font-semibold text-zinc-300">{title}</h2>
);

const InfoLine = ({ title, value }) => (
  <div>
    <p className="text-sm font-medium text-zinc-400">{title}</p>
    <p className="text-sm text-zinc-300">{value}</p>
  </div>
);

const SocialLink = ({ icon, url }) => (
  <a target="_blank" href={url} className="hover:text-[#FFA100] transition">
    <i className={`fi ${icon}`}></i>
  </a>
);
