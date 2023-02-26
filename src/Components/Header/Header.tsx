import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <div id="container">
		<p id="title">Adam Sandler</p>	
        <img className="coverPhoto" draggable="false"
        src=" https://jewishjournal.com/wp-content/uploads/2019/04/adam-sandler.jpg"
        width="400"/>
        </div>
        </div>
    );
}

export default Header;
