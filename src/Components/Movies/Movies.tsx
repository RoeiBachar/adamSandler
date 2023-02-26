import Movie from "../Movie/Movie";
import "./Movies.css";

function Movies(): JSX.Element {
    return (
        <div className="Movies">
            <div id="container">
           <p>movies
           <Movie/></p> 
           
            </div>
			
        </div>
    );
}

export default Movies;
