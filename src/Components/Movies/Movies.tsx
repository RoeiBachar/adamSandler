import axios from "axios";
import Movie from "../Movie/Movie";
import "./Movies.css";
import { app } from "../../Firebase/firebase";
import { useEffect, useState } from "react";
import { movieInterface } from "../../Interfaces/movieInterface";
import {
  doc,
  setDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { Stack, Autocomplete, TextField } from "@mui/material";
import { title } from "process";

function Movies(): JSX.Element {
  const [getter, setter] = useState<movieInterface[]>();

  const db = getFirestore(app);

  const getMovies = async () => {
    const moviesCollection = await collection(db, "movies");
    const movieColumn = await getDocs(moviesCollection);
    const movies = movieColumn.docs.map((doc) => doc.data());
    const myMovies: movieInterface[] = movies.map((item: any) => {
      return {
        title: item.title,
        imdb: item.imdb,
        description: item.description,
        img: item.img,
        year: item.year,
      };
    });
    myMovies.sort(compareYears);
    setter(myMovies);
  };

  const compareYears = (a: movieInterface, b: movieInterface) => {
    return b.year - a.year;
  };
  useEffect(() => {
    getMovies();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Movies">
      <Stack spacing={2} sx={{ width: 500 }}>
        <Autocomplete
          style={{ backgroundColor: "white" }}
          id="free-solo-demo"
          freeSolo
          options={getter ? getter.map((option) => option.title) : []}
          renderInput={(params) => <TextField {...params} label="freeSolo" />}
        />
      </Stack>
      <div id="containerMovies">
        <div id="what">
          {getter?.map((item, index) => (
            <Movie key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movies;
