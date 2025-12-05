export { removePeople } from "../reducers/peopleSlice";
import axios from "../../utils/axios";
import { loadPeople } from "../reducers/peopleSlice";

export const asyncLoadPeople = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const external = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);

    let theUltimateDetails = {
      detail: detail.data,
      external: external.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };
    console.log(theUltimateDetails);
    dispatch(loadPeople(theUltimateDetails));
  } catch (error) {}
};
