import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Biography from "../Biography/Biography";
import Header from "../Header/Header";
import Pictures from "../Pictures/Pictures";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Main(): JSX.Element {
  const userDataName = useSelector(
    (state: RootState) => state.userDataState.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDataName) {
      navigate("/");
    }
  }),
    [];

  return (
    <div className="Main">
      <Header />
      <Pictures />
      <Biography />
    </div>
  );
}

export default Main;
