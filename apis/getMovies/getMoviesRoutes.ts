import { Router } from "express";

import { getMovies } from "./getMoviesController";

const movieRouter = Router();

//get API to fetch the movies as per the requested year, in the query param
//https://localhost:3000/movies?year=2019
movieRouter.get("/movies", getMovies);

export default movieRouter;
