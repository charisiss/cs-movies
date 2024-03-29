import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowForward } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";

import { MovieType } from "types/MovieType";

import classes from "./SearchForm.module.css";

const SearchForm: React.FC = () => {
  const [moduleIsVisible, setModuleIsVisible] = useState<string>("none");
  const [inputText, setInputText] = useState<string>();
  const [searchResults, setsearchResults] = useState<MovieType[]>([]);
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(
        "https://owen-wilson-wow-api.onrender.com/wows/random?results=10"
      );
      const data = await res.json();
      setMovies(data);
      console.log("data: ", data);
    }
    fetchMovies();
  }, []);

  const focusHandler = () => {
    setModuleIsVisible("block");
  };
  const blurHandler = () => {
    setModuleIsVisible("none");
  };

  const submitHandler = (event: MouseEvent) => {
    event.preventDefault;
    setModuleIsVisible("block");
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setInputText(text);
    setsearchResults([]);

    if (text && text.length > 0) {
      movies.filter((movie) => {
        const testMovie = movie.movie?.toLowerCase()?.match(text.toLowerCase());
        console.log("testMovie: ", movie);
        if (!testMovie) return;
        setsearchResults((oldArray: MovieType[]) => [...oldArray, movie]);
      });
    }
  };

  return (
    <React.Fragment>
      <form
        className={classes.searchInputForm}
        onFocus={focusHandler}
        onBlur={blurHandler}
        // onSubmit={submitHandler}
      >
        <TextField
          onChange={changeHandler}
          variant="outlined"
          placeholder="Enter keywords..."
          id="fullWidth"
          data-testid="search-form"
          className={classes.searchInputText}
          InputProps={{
            startAdornment: <Search style={{ marginRight: "10px" }} />,
            classes: { notchedOutline: classes.noBorder },
          }}
        />

        <div
          className={classes.searchResults}
          style={{ display: `${moduleIsVisible}` }}
        >
          <ul>
            {searchResults.length == 0 && <p>Nothing Found</p>}
            {searchResults.map((result, index) => {
              if (index > 2) return;
              return (
                <li key={result.key}>
                  <Link href={"/movies/" + result.movie}>
                    <div className={classes.resultText}>
                      <Image
                        src={`${result.poster}`}
                        height={100}
                        width={60}
                        alt="searchImage"
                      />
                      <p className={classes.txt}>
                        {result.movie}({result.year})
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Button variant="contained" className={classes.searchButton}>
          <ArrowForward
            className={classes.searchArrowIcon}
            onClick={() => {}}
          />
        </Button>
      </form>
    </React.Fragment>
  );
};

export default SearchForm;
