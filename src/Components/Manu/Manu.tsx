import { Link } from "react-router-dom";

import "./Manu.css";

function Manu(): JSX.Element {
    return (
        <div className="Manu">
            <div id="manuContainer">
            <nav>
      <ul>
        <li><Link to="/main">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
      </ul>
    </nav>
            </div>
        </div>
    );
}

export default Manu;


