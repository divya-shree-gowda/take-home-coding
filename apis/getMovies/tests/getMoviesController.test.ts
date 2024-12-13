import request from "supertest";
import express, { Application } from "express";
import { getMovies } from "./../getMoviesController";
import * as service from "./../getMoviesService";

const app: Application = express();
app.get("/movies", getMovies);

describe("getMovies Controller", () => {
  it("should return 400 if 'year' parameter is missing", async () => {
    const response = await request(app).get("/movies");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error:
        "Invalid or missing year parameter. Year must be a 4-digit number.",
    });
  });

  it("should return 400 if 'year' is not a 4-digit number", async () => {
    const response = await request(app).get("/movies?year=abc");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error:
        "Invalid or missing year parameter. Year must be a 4-digit number.",
    });
  });

  it("should return 200 with movies when valid year is provided", async () => {
    const mockMovies = [
      {
        title: "Movie Title",
        release_date: "2023-01-01",
        vote_average: 8.5,
        editors: ["Editor 1", "Editor 2"],
      },
    ];
    jest.spyOn(service, "getMoviesByYear").mockResolvedValue(mockMovies);

    const response = await request(app).get("/movies?year=2023");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMovies);
  });

  it("should return 500 if service layer throws an error", async () => {
    jest
      .spyOn(service, "getMoviesByYear")
      .mockRejectedValue(new Error("Service error"));

    const response = await request(app).get("/movies?year=2023");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Failed to fetch movies",
      message: {},
    });
  });
});
