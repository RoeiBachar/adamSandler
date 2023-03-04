import "./Movie.css";
import firebase from 'firebase/app';
import 'firebase/database';
import { movieInterface } from "../../Interfaces/movieInterface";

function Movie(props:movieInterface): JSX.Element {

  return (
    <div className="Movie">
      <div id="movieContainer">
        <img src= {props.img}/>
        <div id="movieInfo">
            <h1>{props.title}</h1><span>({props.year})</span>
        <p id="info">{props.description}</p>
        <span>{props.imdb}/10 <br/>
        <img src="https://cdn-icons-png.flaticon.com/512/5977/5977585.png" width={30} height={30}/></span>

        </div>
        
      </div>
    </div>
  );
}

export default Movie;
