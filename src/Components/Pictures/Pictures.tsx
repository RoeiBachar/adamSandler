import "./Pictures.css";

function Pictures(): JSX.Element {
  return (
    <div className="Pictures">
        <div id="imageContainer">
      <img className="images" draggable="false"
        src="https://staticc.sportskeeda.com/editor/2023/02/ec0c2-16771313337691-1920.jpg"
      />
      <img className="images" draggable="false"
        src="https://media.vanityfair.com/photos/5d6bc0a930f22c00094de1f0/master/pass/adam-sandler-uncut-gems.jpg"
      />
      <img className="images" draggable="false"
        src="https://www.slashfilm.com/img/gallery/adam-sandlers-14-best-roles-ranked/l-intro-1631137525.jpg"
      />
      </div>
    </div>
  );
}

export default Pictures;
