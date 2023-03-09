import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import "./Routing.css";
import Movies from "../Movies/Movies";
import AddMovies from "../AddMovies/AddMovies";
import Login from "../Login/Login";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/movies" element={<Movies/>}/>
                <Route path="/AddMovies" element={<AddMovies/>}/>
                
                <Route path="*" element={<Main/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
