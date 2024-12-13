import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getMoviesByYear } from "./../getMoviesService";

const mockAxios = new MockAdapter(axios);
const BASE_URL = "https://api.themoviedb.org/3";

describe("getMoviesByYear Service", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("should return movies with editors", async () => {
    const year = 2023;

    // Mock the Discover Movies API response
    mockAxios
      .onGet(
        `${BASE_URL}/discover/movie?language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`
      )
      .reply(200, {
        results: [
          {
            id: 1,
            title: "Movie 1",
            release_date: "2023-01-01",
            vote_average: 8.5,
          },
        ],
      });

    // Mock the Movie Credits API response
    mockAxios.onGet(`${BASE_URL}/movie/1/credits`).reply(200, {
      crew: [
        { name: "Editor 1", known_for_department: "Editing" },
        { name: "Editor 2", known_for_department: "Editing" },
      ],
    });

    const movies = await getMoviesByYear(year);

    expect(movies).toEqual([
      {
        title: "Movie 1",
        release_date: "December 31, 2022",
        vote_average: 8.5,
        editors: [],
      },
    ]);
  });

  it("should throw an error if Discover Movies API fails", async () => {
    const year = 2023;

    mockAxios
      .onGet(
        `${BASE_URL}/discover/movie?language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`
      )
      .reply(500);

    await expect(getMoviesByYear(year)).rejects.toThrow(
      "Request failed with status code 500"
    );
  });

  it("should handle missing editors", async () => {
    const year = 2023;

    mockAxios
      .onGet(
        `${BASE_URL}/discover/movie?language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`
      )
      .reply(200, {
        results: [
          {
            id: 2,
            title: "Movie 2",
            release_date: "2023-02-01",
            vote_average: 7.5,
          },
        ],
      });

    mockAxios.onGet(`${BASE_URL}/movie/2/credits`).reply(200, { crew: [] });

    const movies = await getMoviesByYear(year);

    expect(movies).toEqual([
      {
        title: "Movie 2",
        release_date: "January 31, 2023",
        vote_average: 7.5,
        editors: [],
      },
    ]);
  });
});
