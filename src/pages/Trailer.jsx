import YouTube from "react-youtube";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { MdClose } from "react-icons/md";

function Trailer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";

  const ytVideo = useSelector((state) => state[category]?.info?.videos);

  const options = {
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
    },
  };

  return ytVideo ? (
    <div className="fixed inset-0 z-[9999] bg-[rgba(0,0,0,0.8)] flex items-center justify-center p-4">
      {/* Close Button */}
      <MdClose
        onClick={() => navigate(-1)}
        className="text-white absolute right-4 top-4 md:right-10 md:top-10 text-3xl cursor-pointer"
      />

      {/* Responsive YouTube Player */}
      <div className="w-full max-w-[1100px] aspect-video">
        <YouTube
          videoId={ytVideo.key}
          opts={options}
          className="w-full h-full"
        />
      </div>
    </div>
  ) : (
    <NotFound />
  );
}

export default Trailer;
