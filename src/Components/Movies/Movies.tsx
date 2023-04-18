import axios from "axios";
import Movie from "../Movie/Movie";
import "./Movies.css";
import { app } from "../../Firebase/firebase";
import { SyntheticEvent, useEffect, useState } from "react";
import { movieInterface } from "../../Interfaces/movieInterface";
import {
  doc,
  setDoc,
  updateDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Stack, Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function Movies(): JSX.Element {
  const [movies, setMovies] = useState<movieInterface[]>([]);
  const [updatedMovies, setUpdate] = useState<movieInterface[]>();
  const userData = useSelector((state: RootState) => state.userDataState.user);
  console.log(userData);
  const db = getFirestore(app);

  const handleFavoriteOnFireBase = async (movieId: string) => {
    if (userData) {
      const userDocRef = doc(db, "users", userData.id);
      const updatedUserData = { ...userData };
      const favorites = [...updatedUserData.favorites];
      favorites.push(movieId);

      try {
        await updateDoc(userDocRef, {
          ...updatedUserData,
          favorites,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleFavorite = (movieId: string, isFavorite: boolean) => {
    console.log(`${movieId}:`, isFavorite);
    let updatedMovies = [...movies];
    updatedMovies = updatedMovies.map((movie) => {
      if (movie.id === movieId) {
        return {
          ...movie,
          isFavorite,
        };
      }
      return {
        ...movie,
      };
    });
    setUpdate(updatedMovies as movieInterface[]);
    handleFavoriteOnFireBase(movieId);
  };
  const getMovies = async () => {
    const moviesCollection = await collection(db, "movies");
    const movieColumn = await getDocs(moviesCollection);
    const movies = movieColumn.docs.map((doc) => doc.data());

    const myMovies: movieInterface[] = movies.map((item) => {
      return {
        title: item.title,
        imdb: item.imdb,
        description: item.description,
        img: item.img,
        year: item.year,
        isFavorite: false,
        id: item.id,
      };
    });
    myMovies.sort(compareYears);
    sessionStorage.setItem("data", JSON.stringify(myMovies));
    setUpdate(myMovies);
    setMovies(myMovies);
  };

  const compareYears = (a: movieInterface, b: movieInterface) => {
    return b.year - a.year;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const data = sessionStorage.getItem("data");

    if (!data) {
      getMovies();
    } else {
      const newData = JSON.parse(data);
      setUpdate(newData);
      setMovies(newData);
    }
  }, []);

  const todo = (data: SyntheticEvent) => {
    const movieName = (data.target as HTMLInputElement).textContent;
    console.log(movieName);
    const newArray = movies?.filter((item) => movieName == item.title);
    setUpdate(newArray);
    console.log(newArray);
    if (!newArray?.length) {
      setUpdate(movies);
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
            options={movies ? movies.map((option) => option.title) : []}
            renderInput={(params) => (
              <TextField {...params} label="Search Movie" />
            )}
          />
        </Stack>
      </div>
      <div id="containerMovies">
        <div id="gallaryMovies">
          {updatedMovies?.map((item, index) => (
            <Movie key={index} {...item} handleFavorite={handleFavorite} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movies;
