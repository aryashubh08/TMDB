export { removeMovie } from "../reducers/movieSlice";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { loadMovie } from "../reducers/movieSlice";

export const asyncLoadMovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const external = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const watchProvider = await axios.get(`/movie/${id}/watch/providers`);

    let theUltimateDetails = {
      detail: detail.data,
      external: external.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProvider: watchProvider.data.results.IN,
    };
    console.log(theUltimateDetails);
    dispatch(loadMovie(theUltimateDetails));
  } catch (error) {
    console.log("MOVIE API ERROR:", error);
  }
};
