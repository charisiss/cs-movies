import React, { useEffect, useState } from "react";
import { Star, SortByAlpha } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";

import MovieCard from "../MovieCard";
import { MovieType } from "types/MovieType";
import classes from "./MoviesList.module.css";

type moviesType = {
  movies: MovieType[];
  size: number;
  sort: boolean;
};

const MoviesList: React.FC<moviesType> = (props) => {
  const [movies, setMovies] = useState<MovieType[]>();
  const [sort, setSort] = useState<string>("asc");

  useEffect(() => {
    setMovies(props.movies);
  }, [props.movies]);

  const HandleSort = (type: string) => {
    if (type === "pop") {
      console.log(movies);
      setMovies(
        movies!.sort(function () {
          return 0.5 - Math.random();
        })
      );
    } else if (type === "asc") {
      setSort("dsc");
      setMovies(props.movies.sort((a, b) => (a.movie > b.movie ? 1 : -1)));
    } else {
      setSort("asc");
      setMovies(props.movies.sort((a, b) => (a.movie > b.movie ? 1 : -1)));
      setMovies(props.movies.reverse());
    }
  };

  return (
    <div>
      <br />
      {props.sort && (
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              className={classes.btn}
              startIcon={<SortByAlpha />}
              onClick={() => HandleSort(sort)}
            >
              Sort ASC
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className={classes.btn}
              startIcon={<Star />}
              onClick={() => HandleSort("pop")}
            >
              Popular
            </Button>
          </Grid>
        </Grid>
      )}

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 5, sm: 8, md: 12 }}
        alignItems="center"
        justifyContent="center"
      >
        {movies &&
          movies.map((list, index) => {
            if (index >= props.size) return;
            return (
              <Grid item key={Math.random() * 1}>
                <MovieCard
                  data-testid="movie-card"
                  movie={list}
                  key={Math.random() * 1}
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default MoviesList;
