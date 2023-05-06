import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import "./Manu.css";

function Manu(): JSX.Element {
  return (
    <div className="Manu">
      <div id="manuContainer">
        <nav>
          <ul>
            <li>
              <Link to="/main">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <HashLink smooth to="/main#bio">
                Bio
              </HashLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Manu;
