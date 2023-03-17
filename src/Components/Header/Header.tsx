import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header(): JSX.Element {
  const userDataName = useSelector(
    (state: RootState) => state.userDataState.user?.first_name
  );
  const navigate = useNavigate();
  console.log(userDataName);

  return (
    <div className="Header">
      <div id="container">
        <p id="title">{
        `ADAM SADNLER
        Hello ${userDataName}`
        }</p>

        <img
          className="coverPhoto"
          draggable="false"
          src=" https://jewishjournal.com/wp-content/uploads/2019/04/adam-sandler.jpg"
          width="400"
        />
      </div>
    </div>
  );
}

export default Header;
