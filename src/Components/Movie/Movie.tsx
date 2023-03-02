import "./Movie.css";
import firebase from 'firebase/app';
import 'firebase/database';
import { movieInterface } from "../../Interfaces/movieInterface";

function Movie(props:movieInterface): JSX.Element {

  return (
    <div className="Movie">
      <div id="movieContainer">
        <img src= {props.img} />
        <p id="info">{props.description}</p>
      </div>
    </div>
  );
}

export default Movie;
