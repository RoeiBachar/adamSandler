import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import "./Header.css";
import Pictures from "../Pictures/Pictures";

function Header(): JSX.Element {
  const userDataName = useSelector(
    (state: RootState) => state.userDataState.user?.first_name
  );

  return (
    <div className="Header">
      <div id="container">
        <p id="title">{`Hello ${userDataName}`}</p>
        <div id="pic">
          {" "}
          <Pictures />
        </div>
      </div>
    </div>
  );
}

export default Header;
