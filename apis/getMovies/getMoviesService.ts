import { getDiscoverMoviesByYear, getMovieCredits } from "./getMoviesData";
import convertDate from "./../../utils/dateUtil";

export const getMoviesByYear = async (year: number) => {
  const movieList = await getDiscoverMoviesByYear(year);
  if (!movieList?.data?.results) {
    throw new Error("No movies found for the provided year");
  }

  const movies = await Promise.all(
    movieList.data.results.map(async (movie: any) => {
      let editors: string[] = [];
      try {
        const credits = await getMovieCredits(movie.id);
        editors = credits.data.crew
          .filter((member: any) => member.known_for_department === "Editing")
          .map((editor: any) => editor.name);
      } catch (error) {
        console.log(
          `Failed to fetch credits for movie ID ${movie.id}: ${error}`
        );
      }

      return {
        title: movie.title,
        release_date: convertDate(movie.release_date),
        vote_average: movie.vote_average,
        editors,
      };
    })
  );

  return movies;
};
