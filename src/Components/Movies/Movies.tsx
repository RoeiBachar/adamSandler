import axios from "axios";
import Movie from "../Movie/Movie";
import "./Movies.css";
import { app } from "../../Firebase/firebase";
import { SyntheticEvent, useEffect, useState } from "react";
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
import { json } from "stream/consumers";

function Movies(): JSX.Element {
  const [getter, setter] = useState<movieInterface[]>();
  const [updatedMovies, setUpdate] = useState<movieInterface[]>();

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
    console.log("ohhh why againnn")

    sessionStorage.setItem("data",JSON.stringify(myMovies));

    setUpdate(myMovies);
    setter(myMovies);
  };

  const compareYears = (a: movieInterface, b: movieInterface) => {
    return b.year - a.year;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const data = sessionStorage.getItem("data");
    
    if (!data){
        getMovies();
        
    }
    else{
        console.log("not nowwww")

        const newData= JSON.parse(data)
        setUpdate(newData);
        setter(newData);
    }

   
  }, []);

  const todo = (data: SyntheticEvent) => {
    const movieName = (data.target as HTMLInputElement).textContent;
    console.log(movieName);
    const newArray = getter?.filter((item) => movieName == item.title);
    setUpdate(newArray);
    console.log(newArray);
    if (!newArray?.length) {
      setUpdate(getter);
    }
  };
  return (
    <div className="Movies">
      <div id="searchingContainer">
        <Stack spacing={2} sx={{ width: 500 }}>
          <Autocomplete
            onChange={(e) => {
              todo(e);
            }}
            id="free-solo-demo"
            freeSolo
            options={getter ? getter.map((option) => option.title) : []}
            renderInput={(params) => (
              <TextField {...params} label="Search Movie" />
            )}
          />
        </Stack>
      </div>
      <div id="containerMovies">
        <div id="gallaryMovies">
          {updatedMovies?.map((item, index) => (
            <Movie key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movies;
