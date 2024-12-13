import { Request, Response } from "express";

import { getMoviesByYear } from "./getMoviesService";

export const getMovies = async (req: Request, res: Response) => {
  const { year } = req.query;

  console.log(`------Get Movies Request for the year ${year}-------`);

  // Validate the 'year' parameter
  const yearRegex = /^\d{4}$/; // Regular expression to match a 4-digit year
  if (!year || !yearRegex.test(String(year))) {
    return res.status(400).json({
      error:
        "Invalid or missing year parameter. Year must be a 4-digit number.",
    });
  }

  try {
    //calling the service to
    const movies = await getMoviesByYear(Number(year));
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies", message: error });
  }
};
