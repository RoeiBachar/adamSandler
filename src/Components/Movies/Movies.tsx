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

    setter(myMovies);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="Movies">
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
