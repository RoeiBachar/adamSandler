import "./Movie.css";
import firebase from "firebase/app";
import "firebase/database";
import { movieInterface } from "../../Interfaces/movieInterface";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
function Movie(props: movieInterface): JSX.Element {
  const { isFavorite, id } = props;
  const { handleFavorite } = props;
  const [getFav, setFav] = useState(true);
  console.log(isFavorite);

  return (
    <div className="Movie">
      <div id="movieContainer">
        <img src={props.img} />
        <div id="movieInfo">
          <h1>{props.title}</h1>
          <span>({props.year})</span>
          <p id="info">{props.description}</p>
          <span>
            {props.imdb}/10 <br />
            <img
              src="https://cdn-icons-png.flaticon.com/512/5977/5977585.png"
              width={30}
              height={30}
            />
          </span>
          <div onClick={()=>{handleFavorite && handleFavorite(id, !isFavorite)}}>
            {isFavorite ? (
              <BookmarkIcon  />
            ) : (
              <BookmarkBorderIcon fontSize="large" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
