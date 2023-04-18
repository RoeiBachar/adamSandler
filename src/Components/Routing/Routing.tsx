import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import "./Routing.css";
import Movies from "../Movies/Movies";
import AddMovies from "../AddMovies/AddMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { useEffect } from "react";

function Routing(): JSX.Element {
  useEffect(() => {
    sessionStorage.removeItem("data");
  }, []);

  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AddMovies" element={<AddMovies />} />

        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default Routing;
