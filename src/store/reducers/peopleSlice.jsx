import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const PeopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    loadPeople: (state, action) => {
      state.info = action.payload;
    },
    removePeople: (state, action) => {
      state.info = null;
    },
  },
});

export const { loadPeople, removePeople } = PeopleSlice.actions;
export default PeopleSlice.reducer;
