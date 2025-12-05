import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzY5ZTgzM2YzODcwZmNhMDI1ZWNmMjVkZTE2ZjFlNiIsIm5iZiI6MTc0NDcxNjg0MC40NTgsInN1YiI6IjY3ZmU0NDI4NjFiMWM0YmIzMjk5NmI5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iQBZQw_gjQih4qGMAfsa3nLeglKbsl9msuGhYR_Meug",
  },
});

export default instance;
