import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Biography from "../Biography/Biography";
import Header from "../Header/Header";
import Pictures from "../Pictures/Pictures";
import "./Main.css";

function Main(): JSX.Element {
    const userData = useSelector((state: RootState) => state.userDataState)
  console.log(userData);
    return (
        <div className="Main">
            <Header/>
            <Pictures/>
            <Biography/>
        </div>
    );
}

export default Main;
