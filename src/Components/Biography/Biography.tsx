import "./Biography.css";

function Biography(): JSX.Element {
  return (
    <div className="Biography">
      <div id="bioContainer">
      
        <div id="bioInfo">
        <h2>Who Is Adam Sandler?</h2>
        <p>
Born on September 9, 1966, in New York City, Adam Sandler was always the class clown but didn't consider becoming a comedian until his brother encouraged him to perform at a Boston Comedy Club. He was a regular on MTV's Remote Control and on NBC's Saturday Night Live before devoting himself to making movies like Billy Madison and Happy Gilmore. Sandler is best known for comedy but has also received critical praise for his dramatic work.</p>
        </div>
        <div id="bioImage">
            <img className="bioImage" src="https://hips.hearstapps.com/hmg-prod/images/adam-sandler-gettyimages-481511486.jpg"/>
        </div>
      </div>
      
    </div>
  );
}

export default Biography;
