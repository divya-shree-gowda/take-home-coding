import express from "express";
import dotenv from "dotenv";
dotenv.config();

import movieRouter from "./apis/getMovies/getMoviesRoutes";

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/", movieRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
