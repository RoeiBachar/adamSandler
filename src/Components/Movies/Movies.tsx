import axios from "axios";
import Movie from "../Movie/Movie";
import "./Movies.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore/lite";
import { app } from "../../Firebase/firebase";
import { useEffect, useState } from "react";
import { movieInterface } from "../../Interfaces/movieInterface";

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
        <p>
          {getter?.map((item) => (
           <Movie title={item.title} imdb={item.imdb} img={item.img} year={item.year} description={item.description}/>
          ))}
        </p>
      </div>
    </div>
  );
}

export default Movies;
