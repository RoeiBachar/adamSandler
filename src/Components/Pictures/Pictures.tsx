import "./Pictures.css";

function Pictures(): JSX.Element {
  return (
    <div className="Pictures">
      <div id="imageContainer">
        <div className="images" id="instegram" onClick={()=>window.open("https://www.instagram.com/adamsandler/")}></div>
        <div className="images" id="facebook" onClick={()=>window.open("https://www.facebook.com/Sandler")}></div>
        <div className="images" id="twitter" onClick={()=>window.open("https://twitter.com/AdamSandler")}></div>
      </div>
    </div>
  );
}

export default Pictures;
