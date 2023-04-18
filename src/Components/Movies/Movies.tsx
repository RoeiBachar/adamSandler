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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { updateUserData } from "../../Redux/features/dataSlice";

function Movies(): JSX.Element {
  const [movies, setMovies] = useState<movieInterface[]>([]);
  const [updatedMovies, setUpdatedMovies] = useState<movieInterface[]>([]);
  const userData = useSelector((state: RootState) => state.userDataState.user);
  const db = getFirestore(app);
  const dispatch = useDispatch();

  const handleFavoriteOnFireBase = async (movieId: string) => {
    if (userData) {
      const userDataClone = { ...userData };
      const favorites = [...userDataClone.favorites];
      favorites.push(movieId);

      const updatedUser = {
        ...userDataClone,
        favorites,
      };

      dispatch(updateUserData(updatedUser));

      try {
        const userDocRef = doc(db, "users", userData.id);
        await updateDoc(userDocRef, updatedUser);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleFavorite = (movieId: string, isFavorite: boolean) => {
    let updatedMovies = [...movies];
    updatedMovies = updatedMovies.map((movie) => {
      if (movie.id === movieId) {
        return {
          ...movie,
          isFavorite: !isFavorite,
        };
      }
      return {
        ...movie,
      };
    });

    handleFavoriteOnFireBase(movieId);
    sessionStorage.setItem("data", JSON.stringify(updatedMovies));
    setUpdatedMovies(updatedMovies);
  };

  const getIsMovieOnFavorites = (movieId: string) => {
    if (userData) {
      const isFavorite = userData.favorites.find(
        (favoriteItemId) => favoriteItemId === movieId
      );
      if (isFavorite) {
        return true;
      }
      return false;
    }

    return false;
  };

  const getMovies = async () => {
    const moviesCollection = await collection(db, "movies");
    const movieColumn = await getDocs(moviesCollection);
    const movies = movieColumn.docs.map((doc) => doc.data());

    const myMovies: movieInterface[] = movies.map((movie) => {
      return {
        title: movie.title,
        imdb: movie.imdb,
        description: movie.description,
        img: movie.img,
        year: movie.year,
        isFavorite: getIsMovieOnFavorites(movie.id),
        id: movie.id,
      };
    });
    myMovies.sort(compareYears);
    sessionStorage.setItem("data", JSON.stringify(myMovies));
    setUpdatedMovies(myMovies);
    setMovies(myMovies);
  };

  const compareYears = (a: movieInterface, b: movieInterface) => {
    return b.year - a.year;
  };
  useEffect(() => {
    (async () => {
      window.scrollTo(0, 0);
      const data = sessionStorage.getItem("data");

      if (data) {
        const newData = JSON.parse(data);
        setUpdatedMovies(newData);
        setMovies(newData);
      } else {
        await getMovies();
      }
    })();
  }, []);

  const todo = (data: SyntheticEvent) => {
    const movieName = (data.target as HTMLInputElement).textContent;
    const newArray = movies?.filter((item) => movieName == item.title);
    setUpdatedMovies(newArray);
    if (!newArray?.length) {
      setUpdatedMovies(movies);
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
          {updatedMovies.map((item, index) => (
            <Movie key={index} {...item} handleFavorite={handleFavorite} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movies;
