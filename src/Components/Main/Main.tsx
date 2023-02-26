import Biography from "../Biography/Biography";
import Header from "../Header/Header";
import Pictures from "../Pictures/Pictures";
import "./Main.css";

function Main(): JSX.Element {
    return (
        <div className="Main">
            <Header/>
            <Pictures/>
            <Biography/>
        </div>
    );
}

export default Main;
