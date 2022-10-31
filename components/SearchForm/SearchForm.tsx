import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import classes from "./SearchForm.module.css";
import Link from "next/link";
import Image from "next/image";

type movieType = {
  key: string;
  movie: string;
  poster: string;
  movie_duration: string;
  year: number;
  cast: string;
  director: string;
  releaseDate: string;
  video: {};
};

type moviesType = {
  movies: movieType[];
};

const SearchForm: React.FC<moviesType> = (props) => {
  const [moduleIsVisible, setModuleIsVisible] = useState<string>("none");
  const [inputText, setInputText] = useState<string>();
  const [searchResults, setsearchResults] = useState<movieType[]>([]);

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
    event.preventDefault();
    setInputText(event.target.value);
    setsearchResults([]);
    if (inputText && inputText.length > 0) {
      props.movies.filter((movie) => {
        const testMovie = movie.movie
          .toLowerCase()
          .match(inputText.toLowerCase());
        if (!testMovie) return;
        setsearchResults((oldArray: movieType[]) => [...oldArray, movie]);
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
          className={classes.searchInputText}
          InputProps={{
            startAdornment: <SearchIcon style={{ marginRight: "10px" }} />,
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
                        style={{ marginRight: "20px" }}
                      />
                      {result.movie}({result.year})
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Button variant="contained" className={classes.searchButton}>
          <ArrowForwardIcon
            className={classes.searchArrowIcon}
            onClick={() => {
              console.log("click");
            }}
          />
        </Button>
      </form>
    </React.Fragment>
  );
};

export default SearchForm;
