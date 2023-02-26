import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import "./Routing.css";
import Movies from "../Movies/Movies";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/movies" element={<Movies/>}/>

                <Route path="*" element={<Main/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
