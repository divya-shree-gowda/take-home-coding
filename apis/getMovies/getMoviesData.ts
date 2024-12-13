import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = process.env.API_TOKEN;

//fetching movie list from the Discover Movie API as per the year
export const getDiscoverMoviesByYear = async (year: number) => {
  //console.log("----token---", API_TOKEN);
  const url = `${BASE_URL}/discover/movie?language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`;
  const movieList = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: "application/json",
    },
  });
  return movieList;
};

//this function fetches the movie credits details for the provided movieID
export const getMovieCredits = async (movieId: number) => {
  const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_TOKEN}`;
  const creditList = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: "application/json",
    },
  });
  return creditList;
};
