import Movie from "../Movie/Movie";
import "./Movies.css";
import { app } from "../../Firebase/firebase";
import { SyntheticEvent, useEffect, useState } from "react";
import { movieInterface } from "../../Interfaces/movieInterface";
import {
  doc,
  updateDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { Stack, Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { updateUserData } from "../../Redux/features/dataSlice";
import Manu from "../Manu/Manu";
import { useNavigate } from "react-router-dom";

function Movies(): JSX.Element {
  const [movies, setMovies] = useState<movieInterface[]>([]);
  const [updatedMovies, setUpdatedMovies] = useState<movieInterface[]>([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const userData = useSelector((state: RootState) => state.userDataState.user);
  const db = getFirestore(app);
  const dispatch = useDispatch();
  const [isFavoritesToggle, setIsFavoritesToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, []);
  const handleFavoriteOnFireBase = async (
    movieId: string,
    isFavorite: boolean
  ) => {
    if (userData) {
      const userDataClone = { ...userData };
      let favorites = [...userDataClone.favorites];

      if (isFavorite) {
        favorites = favorites.filter(
          (favoriteItemId) => favoriteItemId !== movieId
        );
      } else {
        favorites.push(movieId);
      }

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
        isFavorite: getIsMovieOnFavorites(movie.id),
      };
    });

    handleFavoriteOnFireBase(movieId, isFavorite);
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

  const searchMovie = (data: SyntheticEvent) => {
    const movieName = (data.target as HTMLInputElement).textContent as string;
    const newArray = movies.filter((item) => movieName == item.title);

    setSelectedMovie(movieName);
  };

  const showAllMovies = () => {
    const data = sessionStorage.getItem("data");
    if (data) {
      const newData = JSON.parse(data);
      setUpdatedMovies(newData);
    }
  };

  return (
    <div className="Movies">
      <div id="searchingContainer">
        <div style={{ zIndex: 1 }}>
          <Manu />
        </div>

        <div id="buttonFavOrAll">
          <button
            type="button"
            onClick={() => {
              setIsFavoritesToggle(!isFavoritesToggle);
            }}
          >
            {isFavoritesToggle ? "All Movies" : "Favorites"}
          </button>
        </div>
        <div id="serachingButton">
          <Stack spacing={2} sx={{ width: 500 }}>
            <Autocomplete
              onChange={(e) => {
                searchMovie(e);
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
      </div>
      <div id="containerMovies">
        <div id="gallaryMovies">
          {updatedMovies
            .map((movie, index) => (
              <Movie key={index} {...movie} handleFavorite={handleFavorite} />
            ))
            .filter((movie) =>
              isFavoritesToggle
                ? movie.props.isFavorite
                : selectedMovie === movie.props.title || selectedMovie === ""
            )}
        </div>
      </div>
    </div>
  );
}

export default Movies;
